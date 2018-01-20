const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/queries.js');
const helpers = require('./helpers.js');
const session = require('express-session');
const morgan = require('morgan');
var path = require('path');
const _ = require('underscore');

/* Dillon Experimental Routes */
const dillonRoutes = require('./dillonRoutes.js');
const index = require('./index.js');
/* Dillon Experimental Routes */

// for allowing cookie sending
app.use(cors({ 
    origin: "localhost:3000",
    credentials: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

// DILLON'S ROUTES
app.use('/dillon', dillonRoutes.router);

// Turn on dev type logging
app.use(morgan('dev'));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'allthesecrets',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 60000,
        path: '/login',
        secure: false
    }
}));


//==================================//
//============ ENDPOINTS ===========//
//==================================//

//=========== REWARDING ============//

// rewarding author of referral
app.post('/reward', function(req, res) {
  let token = req.body.token;
  console.log("token received from axios = ", token);
  db.reward(token);
  res.status(201).send("token processed");
});

//find token by user
app.get('/findToken', function(req, res) {
  
  let username = "dillon"

  db.findTokenByUser(username)
  .then((data) => {
    console.log('this is the data we get back', data.rows[0].token);
    res.status(200).json(data)
  })
});

//==================================//

app.post('/login', (req, res) => {
  let session = req.session;
  var {username, password} = req.body;

  db.getPasswordAtUsername(_.escape(username.replace(/"/g,"'")), (err, row) => {
    if (err) {
      console.error("Error retrieving from database: ", err);
      res.status(500).json(err);
    } else {
      if (row.length) {
        if (bcrypt.compareSync(password, row[0].password)) {
          session.userId = row[0].id
          res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });
          res.status(200).json({ userId: row[0].id, twofactor: row[0].twofactor, password: row[0].password});
        } else {
          res.status(401).json({ error : "Incorrect password"});
        }
      } else {
        res.status(401).json({ error : "Invalid username"});
      }
    }
  });
});


app.get('/logout', (req, res) => {
  console.log('Cookie destroyed');
  res.clearCookie("session-cookie").sendStatus(200);
})

app.get('/usernames', (req, res) => {
  db.getUsernames(parseInt(_.escape(req.query.userId)))
  .then(rows => {
    unescapedRows = rows.map(row => {
      return _.unescape(row.username);
    })
    res.json({ usernames: unescapedRows });
  })
  .catch(err => {
    console.error('error on get of usernames:', err.message);
    res.status(400).json({ error : "Improper format." });
  });
})

app.get('/profile', (req, res) => {
  if (!req.headers.cookie.includes('session-cookie=loggedIn')) {
    res.status(403).json({ error: 'User logged out for security reasons'});
    return;
  }

  // Refresh the cookie timer
  res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });

  var userId = req.query.userId;
  db.profile.getUserInfo(parseInt(_.escape(userId.replace(/"/g,"'"))), (err, row) => {
    if (err) {
      console.error("Error retrieving from database: ", err);
      res.status(500).json(err);
    } else {
      if (row.length) {
        var ui = row[0];
        var userInfo = {
          userId: ui.id,
          username: _.unescape(ui.username),
          displayName: _.unescape(ui.first_name + ' ' + ui.last_name),
          createdAt: _.unescape(ui.created_at),
          avatarUrl: _.unescape(ui.avatar_url)
        }
        res.status(200).json(userInfo);
      } else{
        res.status(400).json({ error : "No such user in database."});
      }
    }
  });
});

app.get('/balance', (req, res) => {

  var userId = req.query.userId;
  db.profile.getBalance(parseInt(_.escape(userId.replace(/"/g,"'"))), (err, row) => {
    if (err) {
      console.error("Error retrieving from database: ", err);
      res.status(500).json(err);
    } else {
      if (row.length) {
        var amount = row[0].amount;
        res.status(200).json({amount: amount});
      } else{
        res.status(400).json({ error : "No such user in database."});
      }
    }
  });
});


app.post('/signup', (req, res) => {
  // check to see if req fields are empty
  if(!req.body.username ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName) {
      res.status(400).json({ error: "Improper format." });
      return;
    }
  let signupData = {};
  for(let key in req.body) {
    signupData[_.escape(key.replace(/"/g,"'"))] = _.escape(req.body[key].replace(/"/g,"'"));
  }


  console.log("signup token will be created here");

  signupData.token = helpers.generateToken(signupData.username);

  console.log("SignUpData created: ", signupData);
  console.log(`token created for username ${req.body.username} = ${signupData.token}`)


  db.signup.newUserSignup(signupData, 100)
    .then(userId => {

      // slip the token in the database
      db.insertToken( req.body.username, signupData.token).then(function() {
        res.status(201).send("token and user created");
      })

      // Initiate inital cookie on successful sign up
      res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });
      res.status(201).json({ userId: userId });
    })
    .catch(err => {
      console.error('error on user signup:', err.message);
      // TODO: send responses depending on what type of error is thrown
      if(err.constraint.includes('users_user')) {
        res.status(422).json({ error : "Username must be unique." });
      } else if(err.constraint.includes('users_email')) {
        res.status(422).json({ error: "Email must be unique." });
      } else if(err.constraint.includes('users_phone')) {
        res.status(422).json({ error: "Phone number must be unique." });
      } else {
        res.status(400).json({ error: "Improper format." });
      }
    })
})

app.post('/pay', (req, res) => {
  // TODO: check if user is still logged in (i.e. check cookie) here. If not, send back appropriate error response.
  if (!req.headers.cookie.includes('session-cookie=loggedIn')) {
    res.status(403).json({ error: 'User logged out for security reasons'});
    return;
  }

  // Refresh the cookie timer
  res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });

  let paymentData = {};
  for(let key in req.body) {
    paymentData[_.escape(key.replace(/"/g,"'"))] = _.escape(req.body[key].toString().replace(/"/g,"'"));
  }
  if(isNaN(parseFloat(paymentData.amount))) {
    console.error('payment amount is not a number:', paymentData.amount);
    res.status(400).json({ error : 'Improper format.' });
    return;
  }
  db.payment(paymentData)
    .then(balance => {
      res.status(201).json({ balance: balance });
    })
    .catch(err => {
      console.error('error on payment:', err.message);
      if(err.message.includes('Insufficient funds')) {
        res.status(422).json({ error: 'Insufficient funds.' });
      } else if(err.message.includes('Invalid payee username')) {
        res.status(422).json({ error: 'Invalid payee username.' });
      } else {
        res.status(400).json({ error : 'Improper format.' })
      }
    })
});


app.get('/publicprofile', (req, res) => {
  if (!req.headers.cookie.includes('session-cookie=loggedIn')) {
    res.status(403).json({ error: 'User logged out for security reasons'});
    return;
  }

  // Refresh the cookie timer
  res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });


  let username = req.query.username;
  username = username && _.escape(username.replace(/"/g,"'"));

  db.profile.getProfileDataByUsername(username)
    .then((results) => {
      let profile = results[0];
      if (profile) {
        var userInfo = {
          userId: profile.id,
          firstName: _.unescape(profile.first_name),
          username: _.unescape(profile.username),
          fullName: _.unescape(profile.first_name + ' ' + profile.last_name),
          createdAt: _.unescape(profile.created_at),
          avatarUrl: _.unescape(profile.avatar_url),
          twofactor: profile.twofactor
        }
        res.status(200).json(userInfo);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error('error retrieving profile data: ', err);
      res.sendStatus(500).json({error: 'server error'});
    })
});

// FEED ENDPOINTS

const FEED_DEFAULT_LENGTH = 5;

app.get('/feed/global', (req, res) => {
  if (!req.headers.cookie.includes('session-cookie=loggedIn')) {
    res.status(403).json({ error: 'User logged out for security reasons'});
    return;
  }

  // Refresh the cookie timer
  res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });

  let limit = FEED_DEFAULT_LENGTH;
  let userId = req.query && parseInt(req.query.userId);
  let beforeId = parseInt(req.query['beforeId']) || null;
  let sinceId = parseInt(req.query['sinceId']) || null;

  db.globalFeed(limit + 1, beforeId, sinceId, userId)
    .then((results) => {
      let unescapedResults = JSON.parse(_.unescape(JSON.stringify(results)));
      res.status(200).json(helpers.buildFeedObject(unescapedResults, limit));
    })
    .catch((err) => {
      console.error('error retrieving global feed: ', err);
      res.sendStatus(500).json({error: 'server error'});
    })
});

app.get('/feed/all', (req, res) => {
  if (!req.headers.cookie.includes('session-cookie=loggedIn')) {
    res.status(403).json({ error: 'User logged out for security reasons'});
    return;
  }

  // Refresh the cookie timer
  res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });

  let userId = parseInt(req.query.userId);
  db.allFeed(userId)
    .then((results) => {
      let unescapedResults = JSON.parse(_.unescape(JSON.stringify(results)));
      res.status(200).json(helpers.buildFeedObject(unescapedResults, 1000));
    })
    .catch((err) => {
      console.error('error retrieving global feed: ', err);
      res.sendStatus(500).json({error: 'server error'});
    })
});

app.get('/feed/user/:userId', (req, res) => {
  if (!req.headers.cookie.includes('session-cookie=loggedIn')) {
    res.status(403).json({ error: 'User logged out for security reasons'});
    return;
  }

  // Refresh the cookie timer
  res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });

  let userId = req.params && parseInt(req.params.userId);

  let limit = FEED_DEFAULT_LENGTH;
  let beforeId = parseInt(req.query['beforeId']) || null;
  let sinceId = parseInt(req.query['sinceId']) || null;
  if (isNaN(userId)) {
    res.sendStatus(400).json({ error: "Improper format." });
    return;
  }

  db.myFeed(limit + 1, beforeId, sinceId, userId)
    .then((results) => {
      let unescapedResults = JSON.parse(_.unescape(JSON.stringify(results)));
      res.status(200).json(helpers.buildFeedObject(unescapedResults, limit));
    })
    .catch((err) => {
      console.error('error retrieving user feed: ', err);
      res.sendStatus(500).json({error: 'server error'});
    })
});

app.get('/feed/profile', (req, res) => {
  if (!req.headers.cookie.includes('session-cookie=loggedIn')) {
    res.status(403).json({ error: 'User logged out for security reasons'});
    return;
  }

  // Refresh the cookie timer
  res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });

  let profileUsername = req.query.profileUsername;
  let loggedInUserId = req.query && parseInt(req.query.userId);

  profileUsername = profileUsername && _.escape(profileUsername.replace(/"/g,"'"));

  let limit = FEED_DEFAULT_LENGTH;
  let beforeId = parseInt(req.query['beforeId']) || null;
  let sinceId = parseInt(req.query['sinceId']) || null;

  db.profileFeed(limit + 1, beforeId, sinceId, profileUsername, loggedInUserId)
    .then((results) => {
      let unescapedResults = JSON.parse(_.unescape(JSON.stringify(results)));
      res.status(200).json(helpers.buildFeedObject(unescapedResults, limit));
    })
    .catch((err) => {
      console.error('error retrieving user feed: ', err);
      res.sendStatus(500).json({error: 'server error'});
    })
});

app.get('/feed/relational', (req, res) => {
  if (!req.headers.cookie.includes('session-cookie=loggedIn')) {
    res.status(403).json({ error: 'User logged out for security reasons'});
    return;
  }

  // Refresh the cookie timer
  res.cookie('session-cookie', 'loggedIn', { maxAge: 180000 });

  let profileUsername = req.query.profileUsername;
  let loggedInUserId = req.query && parseInt(req.query.userId);
  profileUsername = profileUsername && _.escape(profileUsername.replace(/"/g,"'"));
  let limit = FEED_DEFAULT_LENGTH;
  let beforeId = parseInt(req.query['beforeId']) || null;
  let sinceId = parseInt(req.query['sinceId']) || null;

  db.profileFeedRelational(limit + 1, beforeId, sinceId, profileUsername, loggedInUserId)
    .then((results) => {
      let unescapedResults = JSON.parse(_.unescape(JSON.stringify(results)));
      res.status(200).json(helpers.buildFeedObject(unescapedResults, limit));
    })
    .catch((err) => {
      console.error('error retrieving user feed: ', err);
      res.sendStatus(500).json({error: 'server error'});
    })
});


//==================================//
//======= EMAIL INVITATION =========//
//==================================//


//for sending emails
const sgMail = require('@sendgrid/mail');

//source api key from .env file
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/invite", function(req, res) {

  let recipientAddress = req.body.email;
  let username = req.body.userInfo.username;;

  db.findTokenByUser(username)
  .then((data) => {

    let token = data.rows[0].token;
    let link = "https://wardle.herokuapp.com/signup";

    let sender = req.body.userInfo.displayName;
    let subject = "Wardle welcomes you";
    let text = `
    Greetings!
    
    Your friend ${sender} has invited you to Wardle, the future of peer payment.

    Use this special token: ${token} and sign up on wardle.herokuapp.com/signup to give your friend a Jackson.

    With Love,
    Wardle`;

    const msg = {
      to: recipientAddress,
      from: "noreply@wardle.com",
      subject: subject,
      text: text,
      html: `<div>
  <p>Greetings!</p>
  
  <p>Your friend <strong>${sender}</strong> has invited you to <strong>Wardle</strong>, the future of peer payment.</p>
  
  <p>Use this special token: <strong>${token}</strong> and sign up on <a href="https://wardle.herokuapp.com/signup">wardle.herokuapp.com/signup</a> to give your friend a Jackson.</p> 
   <p>
     With Love,
   </p>
  <strong>Wardle</strong>
   
</div>`,
    };

  console.log("MESSAGE ========== ", msg);

  sgMail.send(msg);  
  res.status(200).json(msg);
  });
});

//==================================//

// get * blocks all get requests down the script
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..' , './client/dist/index.html'));
});

app.patch('/request', (req, res) => {
  db.updateRequest(req.body.transactionId)
    .then((results) => {
      res.status(201).json();
    }).catch(err => {
      console.error('error updating pending status', err);
      res.sendStatus(500).json({error: 'server error'});
    })
});

app.post('/request', (req, res) => {
  console.log(req.body);
  db.deleteRequest(req.body.transactionId)
    .then((results) => {
      res.status(200).json();
    }).catch(err => {
      console.error('error deleting request', err);
      res.sendStatus(500).json({error: 'server error'});
    })
});


module.exports = app;
