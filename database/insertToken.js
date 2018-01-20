const pg = require('./index.js').pg;

const insertToken = function(username, token) {

	console.log("insertToken query called");

	let query = `INSERT INTO user_token VALUES ('${username}', '${token}')`;

	console.log("insertToken query = ", query);


	return pg.raw(query);
};

module.exports = {
	insertToken : insertToken
}