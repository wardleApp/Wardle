import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

class TwoFactorAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	open: true,
    }
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  onSubmitHash() {
  	var hashValue = document.getElementById('hashKeyTextField').value;
  	this.props.compareTwoFactorAuth(hashValue);
  }

  render() {
  	const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose.bind(this)}/>,
      <FlatButton label="Submit" secondary={true} icon={<FontIcon className="arrow forward"/>} onClick={this.onSubmitHash.bind(this)}/>
    ];

  	return (
  		<div>
        <Dialog title="Dialog With Actions" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose.bind(this)}>
        <TextField id="hashKeyTextField" hintText="Hash Here" floatingLabelText="Enter The Hash From Your Email"/>
        </Dialog>
      </div> 
  	);
  }

}

export default TwoFactorAuth;