// ---------- Packages ---------- //
import React from 'react';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';

// ---------- React-Redux ---------- //
import { connect } from 'react-redux'
import { actionLoginFailed } from '../actions/actionLoginFailed.jsx';

// ---------- Material UI ---------- //
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

// ---------- Components ---------- //
import Navbar from './Navbar.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  onClickLoginButton() {
    let user = { 
      username: document.getElementById('inputUsername').value, 
      password: document.getElementById('inputPassword').value
    }
    axios.post('/login', user)
    .then((response) => {
      let userId = response.data.userId;
      this.props.logUserIn(userId);
      this.props.history.push('/');
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        this.props.dispatch(actionLoginFailed());
      } else {
        this.props.dispatch(actionLoginFailed());
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={false} />
          <div className='body-container'>
            <div className='form'>
              <TextField 
              id="inputUsername" 
              floatingLabelText="Username" 
              name='username'
              errorText={this.props.errorMessage}
              />
            <br />
            <br/>
              <TextField 
              id="inputPassword" 
              type="password" 
              hintText="Password" 
              floatingLabelText="Password" 
              name='password'
              errorText={this.props.errorMessage}
              />
            <br/>
            <br/>
            <button className='btn' onClick={this.onClickLoginButton.bind(this)}>Log In</button>
            <br/>
            <br/>
            <div>
              <span>Don't have an account? <br/>Create one!</span>
              <br/>
              <Link to="/signup">
                <button className='btn'>Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    errorMessage: state.errorMessage,
    actionLoginFailed
  };
}

export default withRouter(connect(mapStateToProps)(Login));