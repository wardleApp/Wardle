// ---------- Packages ---------- //
import React from 'react';
import { withRouter, Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

// ---------- React-Redux ---------- //
import { connect } from 'react-redux';
import { paymo } from './Reducers';
import { actionLogUserOut } from '../actions/actionLogUserOut.jsx';


const style = {
  nav: { background: '#3D95CE', display: 'flex'},
  left: { display: 'none' },
  log_out: { color: '#fff', textDecoration: 'underline'}
};

class Navbar extends React.Component {
  constructor (props) {
    super(props);
  }

  logOutAndRedirect () {
    this.props.logUserOut();
    this.props.history.push("/login");
  }

  render() {
    return (
      <AppBar
        className='navbar'
        style={style.nav}
        title={
          <div className='navbar-logo'>
            <Link to="/"><span>Wardle</span></Link>
          </div>
        }
        iconStyleLeft={style.left}
        iconElementRight={
          <div>
            {this.props.isLoggedIn &&
              <FlatButton
                style={style.log_out}
                hoverColor='#03A9F4'
                className='navbar-logout'
                onClick={this.logOutAndRedirect.bind(this)}
                label="Log Out"
              />
            }
          </div>
        }
      />

    );
  }
}

function mapStateToProps(state) {

  return {
    isLoggedIn: state.isLoggedIn,
    globalFeed: state.globalFeed,
    balance: state.balance,
    userInfo: state.userInfo,
    userFeed: state.userFeed,
    actionLogOut
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));