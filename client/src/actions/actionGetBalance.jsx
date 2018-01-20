export function actionGetBalance(balance) {
	return { 
		type: 'GET_BALANCE', 
		payload: balance 
	}
}

/* Description: This action gets "dispatched" and then triggers its respective reducer
to get the balance of the user.
*/

/*---------- DONE ----------*/