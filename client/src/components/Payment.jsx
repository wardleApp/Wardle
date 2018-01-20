import React from 'react';
import axios from 'axios';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {connect} from 'react-redux';
import {paymentGetUsernames,
        paymentInputOnChange,
        paymentDropDown,
        paymentTogglePrivate,
        paymentPayUser,
        paymentError} from '../actions/paymentActions.js';

const style = {
  form: {
  },
  input: {
    background: '#fff',
    flex: 'auto',
  },
  button: {
    label: {
      color: '#fff',
      position: 'relative'
    },
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: 30,
  }
}

class Payment extends React.Component {
  componentDidMount() {
    axios('/usernames', { params: { userId: this.props.userInfo.payerId }})
    .then(response => {
      this.props.dispatch(paymentGetUsernames(response.data.usernames));
    })
    .catch(err => {
      console.error(err);
    })
  }

  handleInputChanges (event) {
    let target = event.target;
    var obj = {
      name: target.name,
      value: target.value
    }
    this.props.dispatch(paymentInputOnChange(obj));
  }

  onDropdownInput(searchText) {
    this.props.dispatch(paymentDropDown(searchText));
  }

  setPrivate () {
    this.props.dispatch(paymentTogglePrivate());
  }

  payUser() {
    let payment = {
      payerId: this.props.payerId,
      payeeUsername: this.props.payeeUsername,
      amount: this.props.amount,
      note: this.props.note,
      private: this.props.private || false,
      request: +this.props.amount < 0 ? 'pending' : undefined,
    };
    axios.post('/pay', payment)
      .then((response) => {
        this.props.dispatch(paymentPayUser());
        this.props.refreshUserData(this.props.userInfo.payerId);
        this.props.getHistory(this.props.userInfo.payerId);
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              console.error('UNAUTHORIZED:', error.response);
              break;
            case 422:
              console.error('UNPROCESSABLE ENTRY:', error.response);
              break;
            case 400:
              console.error('BAD REQUEST:', error.response);
              break;
            case 403:
              this.props.logUserOut();
              alert('User has session has timed out.');
              break;
          }
        } else {
          console.error('Error in payment component:', error);
        }
        this.props.dispatch(paymentError());
        });
      }
  render() {
    return (
      <Paper className='payment-container' style={style.form}>
        <div className='payment-item-container'>
          <div className="form-box payment-username">
            <AutoComplete
              hintText="Enter a username"
              floatingLabelText="To:"
              style={style.input}
              name='payeeUsername'
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={this.props.usernames || []}
              maxSearchResults={7}
              searchText={this.props.payeeUsername}
              onUpdateInput = {this.onDropdownInput.bind(this)}
            />
          </div>
          <br />
          <div className="form-box payment-amount">
            <TextField
              style={style.input}
              name='amount'
              value={this.props.amount}
              onChange = {this.handleInputChanges.bind(this)}
              hintText="Enter an amount"
              floatingLabelText="$"
            />
          <br />
          </div>
          <div className="form-box payment-note">
            <TextField
              style={style.input}
              name='note'
              value={this.props.note}
              onChange = {this.handleInputChanges.bind(this)}
              hintText="for"
              floatingLabelText="Leave a comment"
              fullWidth={true}
              multiLine={true}
            />
          <br />
          </div>
        </div>
        <div>
          <button className='btn' onClick={this.payUser.bind(this)}>Pay</button>
          {this.props.paymentFail
            ? <label className='error-text'>
            Error in payment processing
          </label>
          : null
          }
          <Checkbox className='payment-private'
            checked={this.props.private}
            checkedIcon={<VisibilityOff />}
            uncheckedIcon={<Visibility />}
            onClick={this.setPrivate.bind(this)}
            label={'Set transaction as '}
          />
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    usernames: state.usernames,
    payeeUsername: state.payeeUsername,
    note: state.note,
    amount: state.amount,
    paymentFail: state.paymentFail,
    private: state.private
  }
};

const mapDispatchToProps = {
  paymentGetUsernames,
  paymentInputOnChange,
  paymentDropDown,
  paymentTogglePrivate,
  paymentPayUser,
  paymentError
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
