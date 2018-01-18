import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import io from "socket.io-client";
import axios from 'axios';

class LiveLoan extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    	open: false,
    	latestUser: '',
    	currentMessages: [],
    	firstSlider: 0.5,
    	secondSlider: 50
    }
    this.props.socket.on('new joiner', (data) => {
    	this.setState({latestUser: data});
    })
    this.props.socket.on('loan', (data) => {
    	var allMessages = [];
    	allMessages = this.state.currentMessages;
    	allMessages.push(data)
    	this.setState({currentMessages: allMessages});
    })
    this.props.socket.on('refreshing payers feed', (data) => {
    	if(data.userId === this.props.userInfo.userId) {
    		this.props.refreshUserData(data.userId);
    	}
    })
  }

  offerLoan() {
  	var chatTextField = document.getElementById('commentTextField').value;
  	this.props.socket.emit('new loan', {'username': this.props.userInfo.username, 'comments': chatTextField, 'loanAmount': this.state.secondSlider});
  }

  seekLoan() {
  	var chatTextField = document.getElementById('commentTextField').value;
  	this.props.socket.emit('new loan', {'comments': chatTextField, 'loanAmount': this.state.secondSlider});
  }

  handleFirstSlider(event, value) {
    this.setState({firstSlider: value});
  };

  handleSecondSlider(event, value) {
    this.setState({secondSlider: value});
  };

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  offerTaken(entry, currentUser) {
  	axios.post('/dillon/processOffer', {
  		username: entry.username,
  		amount: entry.loanAmount
  	})
  	.then((data) => {
  		let payment = {
      payerId: data.data[0].id,
      payeeUsername: currentUser,
      amount: entry.loanAmount,
      note: entry.comments,
      private: false
    };
    console.log('payment details', payment);
  		axios.post('/pay', payment)
  		.then(() => {
  			this.props.refreshUserData(this.props.userInfo.userId);
  			this.props.socket.emit('refresh payers feed', {userId: data.data[0].id})
  		})
  	})
  }

  render() {
  	const actions = [
      <FlatButton label="Offer Loan" primary={true} onClick={this.offerLoan.bind(this)}/>,
      <FlatButton label="Seek Loan" primary={true} keyboardFocused={true} onClick={this.seekLoan.bind(this)}/>,
    ];

  	return (
  		<div>
  		<Paper className='loan-shark'>
  			<RaisedButton label="Loan Shark" onClick={this.handleOpen.bind(this)}/>
        <Dialog title="Shark Market" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose.bind(this)} autoScrollBodyContent={true}>
          <div>Latest Joiner: {this.state.latestUser}</div>
          {this.state.currentMessages.length ? this.state.currentMessages.map((entry, index) => <div>{entry.username} willing to loan ${entry.loanAmount} USD says {entry.comments} {<FlatButton label="Take Offer" onClick={() => this.offerTaken(entry, this.props.userInfo.username)}/>}</div>) : null}
          <div>
          <p>Interest Rate {this.state.firstSlider}% per day</p><Slider value={this.state.firstSlider} onChange={this.handleFirstSlider.bind(this)}/>
					<p>Loaning ${this.state.secondSlider}USD</p><Slider min={0} max={100} step={1} value={this.state.secondSlider} onChange={this.handleSecondSlider.bind(this)}/>
          <TextField id="commentTextField" hintText="Enter Any Comments"/>
          </div>
        </Dialog>
			 </Paper>
  		</div>
  	)
  }
}

export default LiveLoan;