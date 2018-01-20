import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import NavBar from './Navbar.jsx';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';

class SignUp extends React.Component {
  constructor (props) {
    super(props);
  }


  signUserUp() {
    this.props.dispatch(actionSignUpSubmitted);// Will have to write a dispatch for this
    setTimeout(() => this.props.dispatch(actionSignUpSubmitted), 5000);
    });
    

    let user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        avatarUrl: document.getElementById('avatarUrl').value
        }

    axios.post('/signup', user)
      .then((response) => {
        let userId = response.data.userId;
        this.props.dispatch(actionLogUserIn(userId));
        this.props.history.push('/');
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          console.log('error authenticating user errors', error.response)
          this.props.dispatch(actionSignUpAuthError())
        } else {
          console.log('Error in component', error.response)
          this.props.dispatch(actionSignUpComponentError())
        }
      });
  }

  componentWillMount() {
      // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.formData.password) {
          return false;
      }
      return true;
    });
  }

  render() {

    const { formData, submitted } = this.state;
    return (
      <div>
        <NavBar isLoggedIn={false} />
        <div className='body-container'>
          <div className='form'>
            <ValidatorForm
              ref="form"
              onSubmit={this.signUserUp.bind(this)}
              onError={errors => console.log(errors)}
            >
              <TextValidator
                floatingLabelText="Username"
                // onChange={this.handleInputChanges.bind(this)}
                name="username"
                id="username"
                value={formData.username}
                validators={['required', 'isString', 'minStringLength:4', 'maxStringLength:20']}
                errorMessages={['this field is required', 'invalid input', 'must be at least 4 character', 'must not excede 20 characters']}
              /><br/>
              <TextValidator
                floatingLabelText="First Name"
                // onChange={this.handleInputChanges.bind(this)}
                name="firstName"
                id="firstName"
                value={formData.firstName}
                validators={['required', 'isString', 'minStringLength:1', 'maxStringLength:20']}
                errorMessages={['this field is required', 'invalid input', 'this field is required', 'must not excede 20 characters']}
              /><br/>
              <TextValidator
                floatingLabelText="Last Name"
                // onChange={this.handleInputChanges.bind(this)}
                name="lastName"
                id="lastName"
                value={formData.lastName}
                validators={['required', 'isString', 'minStringLength:1', 'maxStringLength:20']}
                errorMessages={['this field is required', 'invalid input', 'this field is required', 'must not excede 20 characters']}
              /><br/>
              <TextValidator
                floatingLabelText="Email Address"
                // onChange={this.handleInputChanges.bind(this)}
                name="email"
                id="email"
                value={formData.email}
                validators={['required', 'isEmail', 'minStringLength:7', 'maxStringLength:64']}
                errorMessages={['this field is required', 'not a valid email address', 'must enter a unique email address', 'must not excede 64 characters']}
              /><br/>
              <TextValidator
                floatingLabelText="Phone Number"
                // onChange={this.handleInputChanges.bind(this)}
                name="phone"
                id="phone"
                value={formData.phone}
                validators={['required', 'isNumber', 'minStringLength:10', 'maxStringLength:11']}
                errorMessages={['this field is required', 'not a valid phone number', 'example: 7895551234', 'must not excede 11 characters']}
              /><br/>
              <TextValidator
                floatingLabelText="Password"
                // onChange={this.handleInputChanges.bind(this)}
                name="password"
                id="password"
                type="password"
                value={formData.password}
                validators={['required', 'isString', 'minStringLength:4', 'maxStringLength:64']}
                errorMessages={['this field is required', 'not a valid email address', 'must be at least 4 character', 'must not excede 64 characters']}
              /><br/>
              <TextValidator
                floatingLabelText="Re-enter password"
                // onChange={this.handleInputChanges.bind(this)}
                name="repeatPassword"
                id="repeatPassword"
                type="password"
                value={formData.repeatPassword}
                validators={['required', 'isPasswordMatch']}
                errorMessages={['this field is required', 'must match previous field']}
              /><br/>
              <TextValidator
                floatingLabelText="Avatar URL (Optional)"
                // onChange={this.handleInputChanges.bind(this)}
                value={formData.avatarUrl}
                name="avatarUrl"
                id="avatarUrl"
              /><br/>
            <div>
              <button className='btn' onClick={this.signUserUp.bind(this)}>Create Account</button>
              {this.state.didSignupFail && 
                <span className="error-text">
                  {this.state.errorCode === 422
                    ? <span>Username, Phone Number, or Email is not unique. Please try again.</span>
                    : <span>Our servers are having issues. Please try later</span>
                  }
                </span>
              }
            </div>
          </ValidatorForm>
          <div>
            <br/>
            <span>Already a member?</span>
            <br/>
            <Link to="/login"><button className='btn'>Sign in</button></Link>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    isLoggedIn: state.isLoggedIn,      
    submitted: state.submitted,
    didSignupFail: state.didSignupFail,
    errorCode: state.errorCode 
    actionLogUserIn,
    actionGetUserInfo,
    actionSignUp
  };
}

export default SignUp;
