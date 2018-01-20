const signup = require('../database/signup.js');
const login = require('../database/login.js');
const feed = require('../database/feed.js');
const profile = require('../database/profile.js');
const payment = require('../database/pay.js');
const usernames = require('../database/usernames.js');

const reward = require('../database/reward.js').reward;
const insertToken = require('../database/insertToken.js').insertToken;
const findTokenByUser = require('../database/findTokenByUser.js').findTokenByUser;

module.exports = {
  signup: signup,
  profile: profile,
  getPasswordAtUsername: login.getPasswordAtUsername,
  payment: payment.pay,
  getUsernames: usernames.getUsernames,
  globalFeed: feed.globalFeed,
  allFeed: feed.allFeed,
  myFeed: feed.myFeed,
  profileFeed: feed.profileFeed,
  profileFeedRelational: feed.profileFeedRelational,
  updateRequest: feed.updateRequest,
  deleteRequest: feed.deleteRequest,
  
  reward: reward,
  insertToken: insertToken,
  findTokenByUser: findTokenByUser
}
