export function actionLoadMoreFeed(feedData) {
	return { 
		type: 'LOAD_MORE_FEED', 
		payload: feedData 
	}
}

/* Description: This action gets "dispatched" and then triggers its respective reducer
to load more transactions either in the globalFeed or localFeed.
*/

/*---------- DONE ----------*/