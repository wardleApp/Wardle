import React from 'react';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

<<<<<<< 0c02d3f8b5ce84132b13e9f9a47127cd6a4c224a
<<<<<<< 79670a83d72a2954af53bf9a2371545c88a1963e
=======
>>>>>>> accept working
class Requests extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    }
  }
<<<<<<< 0c02d3f8b5ce84132b13e9f9a47127cd6a4c224a
=======
const Requests = (props) => {
  console.log(props.request);
  return props.request.payee.userId === props.userId ? (
    <div className='feed-container'>
      <ListItem disabled={true}
        leftAvatar={<Avatar src={'/images/no-image.gif'} />}
        primaryText={
          <span>
            <span className='feed-item-user'><Link to={`/${props.request.payer.username}`}>{props.request.payer.fullName}</Link></span> has sent you a payment request {'(private)'}
            <p className='feed-item-note'>{props.request.note}</p>
          </span>
        }
        rightAvatar={
          <div className='feed-item-amount showDebit'>
            {props.request.amount}
          </div>
        }
        secondaryText={
         <div className='feed-item-timestamp'>{props.request.timestamp}</div>
        }
        secondaryTextLines={1}
      />

    </div>
  ) : (
    <div className='feed-container'>
      <ListItem disabled={true}
        leftAvatar={<Avatar src={'/images/no-image.gif'} />}
        primaryText={
          <span>
            <span className='feed-item-user'>You have sent <Link to={`/${props.request.payee.username}`}>{props.request.payee.fullName}</Link></span> a payment request {'(private)'}
            <p className='feed-item-note'>{props.request.note}</p>
          </span>
        }
        rightAvatar={
          <div className='feed-item-amount'>
            {props.request.amount.replace('--', '')}
          </div>
        }
        secondaryText={
         <div className='feed-item-timestamp'>{props.request.timestamp}</div>
        }
        secondaryTextLines={1}
      />
>>>>>>> request modules
=======
>>>>>>> accept working

  handleAccept() {
    let payment = {
      payerId: this.props.request.payee.userId,
      payeeUsername: this.props.request.payer.username,
      amount: this.props.request.amount.replace('-', ''),
      note: this.props.request.note,
      private: this.props.request.private,
      request: false,
      pending: false
    };
    axios.post('/pay', payment).then(response => {
      this.props.refreshUserData(this.props.request.payee.userId);
    });
<<<<<<< 0c02d3f8b5ce84132b13e9f9a47127cd6a4c224a
    this.handleDecline();
  }

  handleDecline() {
    axios.patch('/request', {transactionId: this.props.request.transactionId}).then(response => {
      this.props.getHistory(this.props.request.payee.userId);
      this.props.refreshUserData(this.props.request.payee.userId);
    });
  }

  handleCancel() {
    axios.post('/request', {transactionId: this.props.request.transactionId}).then(response => {
      this.props.getHistory(this.props.request.payer.userId);
      this.props.refreshUserData(this.props.request.payer.userId);
    });
  }

  render () {
    return (
      <div>
        {this.props.request.payee.userId === this.props.userId ? (
          <div className='feed-container'>
            <ListItem disabled={true}
              leftAvatar={<Avatar src={'/images/no-image.gif'} />}
              primaryText={
                <span>
                  <span className='feed-item-user'><Link to={`/${this.props.request.payer.username}`}>{this.props.request.payer.fullName}</Link></span> has sent you a payment request {'(private)'}
                    <p className={this.props.request.note === '' ? 'feed-empty-note' : 'feed-item-note'}>{this.props.request.note === '' ? 'empty note' : this.props.request.note}</p>
                  </span>
                }
              rightAvatar={
                <div className='feed-item-amount showDebit'>
                  {this.props.request.amount}
                </div>
              }
              secondaryText={
                <div className='feed-item-timestamp'>{this.props.request.timestamp}</div>
              }
              secondaryTextLines={1}

=======
    axios.patch('/request', {transactionId: this.props.request.transactionId}).then(response => {
      this.props.getHistory(this.props.request.payee.userId);
    });
  }

  handleDecline() {

  }

  handleCancel() {

  }

  render () {
    console.log(this.props);
    return (
      <div>
        {this.props.request.payee.userId === this.props.userId ? (
          <div className='feed-container'>
            <ListItem disabled={true}
              leftAvatar={<Avatar src={'/images/no-image.gif'} />}
              primaryText={
                <span>
                  <span className='feed-item-user'><Link to={`/${this.props.request.payer.username}`}>{this.props.request.payer.fullName}</Link></span> has sent you a payment request {'(private)'}
                    <p className={this.props.request.note === '' ? 'feed-empty-note' : 'feed-item-note'}>{this.props.request.note === '' ? 'empty note' : this.props.request.note}</p>
                  </span>
                }
              rightAvatar={
                <div className='feed-item-amount showDebit'>
                  {this.props.request.amount}
                </div>
              }
              secondaryText={
                <div className='feed-item-timestamp'>{this.props.request.timestamp}</div>
              }
              secondaryTextLines={1}

>>>>>>> accept working
              rightIconButton ={
                <div className="request-buttons">
                  <FlatButton label="Accept" primary={true} onClick={this.handleAccept.bind(this)} />
                  <FlatButton label="Decline" secondary={true} onClick={this.handleDecline.bind(this)}/>
                </div>
              }
            />
          </div>
          ) : (
          <div className='feed-container'>
            <ListItem disabled={true}
              leftAvatar={<Avatar src={'/images/no-image.gif'} />}
              primaryText={
                <span>
                  <span className='feed-item-user'>You have sent <Link to={`/${this.props.request.payee.username}`}>{this.props.request.payee.fullName}</Link></span> a payment request {'(private)'}
                    <p className={this.props.request.note === '' ? 'feed-empty-note' : 'feed-item-note'}>{this.props.request.note === '' ? 'empty note' : this.props.request.note}</p>
                  </span>
                }
              rightAvatar={
                <div className='feed-item-amount'>
                  {this.props.request.amount.replace('--', '')}
                </div>
              }
              secondaryText={
                <div className='feed-item-timestamp'>{this.props.request.timestamp}</div>
              }
              secondaryTextLines={1}
              rightIconButton={
                <div className="request-buttons">
                  <FlatButton onClick={this.handleCancel.bind(this)} label="Cancel" secondary={true} />
                </div>
              }
            />
            </div>
          )
        }
      </div>
    );
  }
}
export default Requests;
