import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import reducer from './reducers/rootReducer.jsx';
import { createStore } from 'redux';
import App from './components/app.jsx';


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render (
  <Provider store={store} >
    <App />
  </Provider>, 
  document.getElementById('app')
);


// // ---------- Packages ---------- //
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import $ from 'jquery';
// import axios from 'axios';
// import io from "socket.io-client";

// // ---------- Material UI ---------- //
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

// // ---------- Components ---------- //
// import LoggedOutHome from './components/LoggedOutHome.jsx';
// import Home from './components/Home.jsx';
// import Login from './components/Login.jsx';
// import SignUp from './components/SignUp.jsx';
// import Profile from './components/Profile.jsx';
// import Navbar from './components/Navbar.jsx';
// // ---------- Helper ---------- //
// import feedManipulation from './feedManipulation.js'

// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: '#3D95CE',
//   },
// });

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       isLoggedIn: false,
//       globalFeed: {},
//       userFeed: {},
//       balance: null,
//       userInfo: {}
//     };
//     this.socket = io('http://127.0.0.1:3000/');
//   }

//   loadUserData(userId) {
//     this.getUserInfo(userId)
//     this.getBalance(userId);
//     this.getFeed('globalFeed', userId);
//     this.getFeed('userFeed', userId);
//   }

//   refreshUserData(userId) {
//     this.getBalance(userId);
//     this.getFeed('globalFeed', userId, this.state.globalFeed.newestTransactionId || null);
//     this.getFeed('userFeed', userId, this.state.userFeed.newestTransactionId || null);
//   }

//   getFeed(feedType, userId = null, sinceId) {
//     let endpoint = feedManipulation.returnFeedEndpoint(feedType, userId);

//     let params = {
//       sinceId: sinceId,
//       userId: userId
//     }

//     axios(endpoint, {params: params})
//       .then((response) => {
//         this.prependNewTransactions(feedType, response.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }

//   prependNewTransactions(feedType, transactionSummary) {
//     // If no results return, do nothing
//     if (!transactionSummary || transactionSummary.count === 0) {
//       return;
//     }

//     // If feed was empty, set the returned transactions as the feed
//     let isFeedEmpty = !this.state[feedType].count || this.state[feedType].count === 0;

//     let newFeedObject = isFeedEmpty
//       ? transactionSummary
//       : feedManipulation.mergeFeeds(transactionSummary, this.state[feedType]);

//     this.setState({
//       [feedType]: newFeedObject
//     })
//   }

//   loadMoreFeed(feedType, userId) {
//     let endpoint = feedManipulation.returnFeedEndpoint(feedType, userId);

//     // Send along the next valid ID you'd like returned back
//     // from the database
//     let params = {
//       beforeId: this.state[feedType].nextPageTransactionId
//     }

//     axios(endpoint, {params: params})
//       .then((response) => {

//         // Confirm there additional items to load
//         if (response.data && response.data.count > 0) {
//           let combinedItems = feedManipulation.mergeFeeds(this.state[feedType], response.data);

//           this.setState({
//             [feedType]: combinedItems
//           })
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       }); 
//   }

//   getBalance(userId) {
//     axios('/balance', {params: {userId: userId}})
//       .then((response) => {
//         this.setState({
//           balance: response.data.amount
//         });
//       })
//       .catch((err) =>{
//         console.error(err);
//       });
//   }

//   getUserInfo(userId) {
//     axios('/profile', {params: {userId: userId}})
//       .then((response) => {
//         this.setState({
//           userInfo: response.data
//         });
//       })
//       .catch((err) =>{
//         console.error(err);
//       });
//   }

//   logUserIn(userId) {
//     // set the userId in the userInfo object as soon as the user logs in
//     var obj = this.state.userInfo;
//     obj.userId = userId;
//     this.setState({
//       isLoggedIn: true,
//       userInfo: obj, 
//     })
//     this.loadUserData(userId);
//   }

//   logUserOut() {
//     this.setState({
//       isLoggedIn: false,
//       globalFeed: {},
//       userFeed: {},
//       balance: null,
//       userInfo: {}
//     })
//     axios('/logout')
//     .then((response) => {
//       console.log('Logout success');
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log('Logout unsuccesful');
//     })
//   }

//   twoFactorAuthToggle() {
//     this.setState({twoFactorAuth: !this.state.twoFactorAuth});
//   }

//   render () {
    
//     const HomeWithProps = (props) => {
//       return (
//         <div>
//           {!this.state.isLoggedIn 
//             ? <LoggedOutHome 
//                 isLoggedIn={this.state.isLoggedIn} 
//                 logUserOut={this.logUserOut.bind(this)}
//                 {...props}
//               />
//             : <Home
//                 refreshUserData={this.refreshUserData.bind(this)}
//                 isLoggedIn={this.state.isLoggedIn} 
//                 logUserOut={this.logUserOut.bind(this)}
//                 userFeed={this.state.userFeed} 
//                 loadMoreFeed={this.loadMoreFeed.bind(this)}
//                 globalFeed={this.state.globalFeed}
//                 userInfo={this.state.userInfo}
//                 balance={this.state.balance}
//                 cookie={this.state.cookie}
//                 socket={this.socket}
//                 {...props}
//               />
//           }
//         </div>
//       );
//     };

//     const ProfileWithProps = (routeProps) => {
//       return (
//         <div>
//           {!this.state.isLoggedIn 
//             ? <LoggedOutHome 
//                 isLoggedIn={this.state.isLoggedIn} 
//                 logUserOut={this.logUserOut.bind(this)}
//                 {...routeProps}
//               />
//             : <Profile 
//                 key={routeProps.location.pathname}
//                 refreshUserData={this.refreshUserData.bind(this)}
//                 isLoggedIn={this.state.isLoggedIn} 
//                 logUserOut={this.logUserOut.bind(this)}
//                 userInfo={this.state.userInfo}
//                 twoFactorAuthToggle={this.twoFactorAuthToggle.bind(this)}
//                 cookie={this.state.cookie}
//                 {...routeProps} 
//               />
//           }
//         </div>
//       );
//     };

//     return (

          // <MuiThemeProvider muiTheme={muiTheme}>
//         <BrowserRouter>
//           <Switch>
//             <Route 
//               exact path="/signup" 
//               render={routeProps => <SignUp {...routeProps} logUserIn={this.logUserIn.bind(this)} />} 
//             />
//             <Route 
//               exact path="/login" 
//               render={routeProps => <Login {...routeProps} logUserIn={this.logUserIn.bind(this)}/>} 
//             />
//             <Route 
//               path="/:username"
//               onEnter={ this.requireAuth }
//               render={ProfileWithProps}
//             />
//             <Route 
//               path="/" 
//               render={HomeWithProps} 
//             />
//           </Switch>
//         </BrowserRouter>
//       </MuiThemeProvider>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));
