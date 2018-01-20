export function actionLogUserIn(userId) {
	return { 
		type: 'LOG_USER_IN', 
		payload: userId 
	}
}

/* Description: This action gets "dispatched" and then triggers its respective reducer
to log the user in.
*/

/*---------- DONE ----------*/