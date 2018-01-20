export function actionLogUserOut(data) {
	return { 
		type: 'LOG_USER_OUT', 
		payload: data 
	}
}

/* Description: This action gets "dispatched" and then triggers its respective reducer
to log the user out by changing state.
*/

/*---------- DONE ----------*/