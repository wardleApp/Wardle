const pg = require('./index.js').pg;

const findTokenByUser = function(username) {
	let query = (
		`SELECT token FROM user_token WHERE username = '${username}'`
	);

	return pg.raw(query)
};

module.exports = { findTokenByUser : findTokenByUser }