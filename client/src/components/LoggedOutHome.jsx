import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';

class LoggedOutHome extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Navbar 
        logUserOut={this.props.logUserOut} />
        <div className='body-container'>
          <div className='splash' >
            <div className='splash-images'>
              <img src='/images/nexus-image.png' width='316px' height='643px' />
            </div>
            <div className='splash-textColumn'>
              <h1>Send money and make purchases with Paymo.</h1>

              <p>New to Paymo?</p>
              <Link to="/signup"><button className='btn'>Create an account</button></Link>

              <p>Already a member?</p>
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
    balance: state.balance,
    userInfo: state.userInfo,
    isLoggedIn: state.isLoggedIn,
    globalFeed: state.globalFeed,
    userFeed: state.userFeed,
    actionLogUserIn,
    actionLogUserOut,
    actionLoginFailed,
    actionSetInitialFeed,
    actionGetBalance,
    actionGetUserInfo,
    actionLoadMoreFeed,
    actionInitialStates
  };
}

export default LoggedOutHome;