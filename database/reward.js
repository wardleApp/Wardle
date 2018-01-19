const pg = require('./index.js').pg;

//takes in a token, rewards the user that is associated to it on db
const reward = function(token) {

	console.log("reward query called");

	let query = (
	`UPDATE balance SET amount = ( ( SELECT amount FROM balance WHERE user_id = ( SELECT id FROM users WHERE username = ( SELECT username from user_token WHERE token = '${token}') ) ) + 20) WHERE user_id = ( SELECT id FROM users WHERE username = ( SELECT username from user_token WHERE token = '${token}') )`
 	);

 	console.log("reward query = ", query);

	pg.raw(query).then();
};

module.exports = { reward : reward }