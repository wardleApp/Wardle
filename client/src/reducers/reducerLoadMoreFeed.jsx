export function reducerLoadMoreFeed(state = { globalFeed: {}, userFeed: {} },  action) {
  switch (action.type) {
    case 'LOAD_MORE_FEED': 
      return Object.assign({}, state, {
      	[action.payload.feedType]: action.payload.obj
      })
    default: 
      return state;
  }
}

/* Description: This reducer looks to load more data into either the globalFeed or userFeed. */

/*---------- DONE ----------*/