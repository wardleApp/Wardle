export function actionSetInitialFeed(feedData) {
	return { 
		type: 'SET_INITIAL_FEED', 
		payload: feedData
	}
}

/* Description: This action gets "dispatched" and then triggers its respective reducer
to change what type of "feed" the user is seeing ("globalFeed" or "userFeed") and the corresponding
transactions in either feed.
*/

/*---------- DONE ----------*/