const pg = require('./index.js').pg;

//takes in a token, rewards the user that is associated to it on db
const findTokenByUser = function(username, callback) {

	console.log("findTokenByUser query called");

	let query = (
		`SELECT token FROM user_token WHERE username = '${username}'`
	);

 	console.log("query = ", query);


	return pg.raw(query);
};

module.exports = { findTokenByUser : findTokenByUser }