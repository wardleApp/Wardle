export function actionGetUserInfo(userInfo) {
	return { 
		type: 'GET_USER_INFO', 
		payload: userInfo 
	}
}

/* Description: This action gets "dispatched" and then triggers its respective reducer
to set the user info to pass down.
*/

/*---------- DONE ----------*/