// ---------- Packages ---------- //
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';

// ---------- React-Redux ---------- //
import { connect } from 'react-redux';
import Actions from './actions/loginAttempt.jsx'

// ---------- Material UI ---------- //
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// ---------- Componenents ---------- //
import LoggedOutHome from './components/LoggedOutHome.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import Navbar from './components/Navbar.jsx';
// ---------- Helper ---------- //
import feedManipulation from './feedManipulation.js'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3D95CE',
  },
})

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  loadUserData(userId) {
    this.getUserInfo(userId);
    this.getBalance(userId);
    this.getFeed('globalFeed', userId);
    this.getFeed('userFeed', userId);
    this.getFriendsList(userId);
  }

  refreshUserData(userId) {
    this.getBalance(userId);
    this.getFeed('globalFeed', userId, this.props.globalFeed.newestTransactionId || null);
    this.getFeed('userFeed', userId, this.props.userFeed.newestTransactionId || null);
    this.getFriendsList(userId);
  }

  getFeed(feedType, userId = null, sinceId) {
    let endpoint = feedManipulation.returnFeedEndpoint(feedType, userId);

    let params = {
      sinceId: sinceId,
      userId: userId
    }

    axios(endpoint, {params: params})
      .then((response) => {
        this.prependNewTransactions(feedType, response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  prependNewTransactions(feedType, transactionSummary) {
    // If no results return, do nothing
    if (!transactionSummary || transactionSummary.count === 0) {
      return;
    }

    // If feed was empty, set the returned transactions as the feed
    let isFeedEmpty = !this.props[feedType].count || this.props[feedType].count === 0;

    let newFeedObject = isFeedEmpty
      ? transactionSummary
      : feedManipulation.mergeFeeds(transactionSummary, this.props[feedType]);
    this.props.dispatch(actionPrependFeed({ feedType: feedType, obj: newFeedObject }))

  }

  loadMoreFeed(feedType, userId) {
    let endpoint = feedManipulation.returnFeedEndpoint(feedType, userId);

    // Send along the next valid ID you'd like returned back
    // from the database
    let params = {
      beforeId: this.props[feedType].nextPageTransactionId
    }

    axios(endpoint, { params: params })
      .then((response) => {

        // Confirm there additional items to load
        if (response.data && response.data.count > 0) {
          let combinedItems = feedManipulation.mergeFeeds(this.props[feedType], response.data);
          this.props.dispatch(actionLoadMoreFeed({ feedType: feedType, obj: combinedItems }))
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getBalance(userId) {
    axios('/balance', {params: {userId: userId}})
      .then((response) => {
        this.props.dispatch(actionBalance(response.data.amount))
      })
      .catch((err) =>{
        console.error(err);
      });
  }

  getUserInfo(userId) {
    axios('/profile', {params: {userId: userId}})
      .then((response) => {
          this.props.dispatch(actionUserInfo(response.data))
      })
      .catch((err) =>{
        console.error(err);
      });
  }

  getFriendsList(userId) {
    axios('/friends', { params: { userId: userId } })
      .then((response) => {
        console.log('response', response.data)
        this.props.dispatch(getFriends(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  logUserIn(userId) {
     // set the userId in the userInfo object as soon as the user logs in
     var obj = this.props.userInfo;
     obj.userId = userId;
     this.props.dispatch(actionLogIn(obj));
     this.loadUserData(userId);
   }


  render () {
    const HomeWithProps = (props) => {
      return (
        <div>
          {!this.props.isLoggedIn
            ? <LoggedOutHome 
                logUserIn={this.logUserIn.bind(this)}
                {...props}
              />
            : 
            <Home
              refreshUserData={this.refreshUserData.bind(this)}
              // logUserOut={this.logUserOut.bind(this)}
              loadMoreFeed={this.loadMoreFeed.bind(this)}
              {...props}
              />
          }
        </div>
      );
    };

    const ProfileWithProps = (routeProps) => {
      return (
        <div>
          {!this.props.isLoggedIn 
            ? <LoggedOutHome 
                isLoggedIn={this.props.isLoggedIn} 
                logUserIn={this.logUserIn.bind(this)}
                {...routeProps}
              />
            : 
            <Profile 
                key={routeProps.location.pathname}
                refreshUserData={this.refreshUserData.bind(this)}
                isLoggedIn={this.props.isLoggedIn} 
                // logUserOut={this.logUserOut.bind(this)}
                // isLoggedIn={this.props.isLoggedIn} 
                // logUserOut={this.logUserOut.bind(this)}
                userInfo={this.props.userInfo}
                {...routeProps}
              />
          }
        </div>
      );
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <Switch>
            <Route 
              path="/:username"
              onEnter={ this.requireAuth }
              render={ProfileWithProps}
            />
            <Route 
              path="/" 
              render={HomeWithProps} 
            />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}




const mapStateToProps = state => {
  return {
    balance: state.balance,
    userInfo: state.userInfo,
    isLoggedIn: state.isLoggedIn,
    globalFeed: state.globalFeed,
    userFeed: state.userFeed,
    actionLogOut,
    actionLogIn,
    getFriends,
    actionBalance,
    actionUserInfo,
    actionPrependFeed,
    actionLoadMoreFeed
  };
}



export default connect(mapStateToProps)(App);