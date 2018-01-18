const pg = require('./index.js').pg;
const Promise = require('bluebird');

module.exports = {

  getUserInfo: (userId, callback) => {
    pg.table('users')
      .where({id: userId})
      .select('id', 'username', 'first_name', 'last_name', 'created_at', 'avatar_url')
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      });
  },


  getBalance: (userId, callback) => {
    pg.table('balance')
      .where({user_id: userId})
      .select('amount')
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      });
  },

  getProfileDataByUsername: (username) => {
    return pg.table('users')
      .where({username: username})
      .select('id', 'username', 'first_name', 'last_name', 'created_at', 'avatar_url', 'twofactor')
      .limit(1)
  },

  toggleTwoFactorAuth: (username, currentAuth) => {
    return new Promise((resolve, reject) => {
      pg.table('users')
      .where({username: username})
      .update({'twofactor': currentAuth})
      .then((result) => {
        console.log('This should consol log result now', result);
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      })
    })
  }

};