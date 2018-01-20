export function reducerSetInitialFeed(state = { globalFeed: {}, userFeed: {} },  action) {
  switch (action.type) {
    case 'SET_INITIAL_FEED': 
      return Object.assign({}, state, {
      	[action.payload.feedType]: action.payload.obj 
      })
    default: 
      return state;
  }
}

/* Description: This reducer looks to update either the globalFeed or userFeed with an object
that has a list of the most recent transactions that have occurred.
*/

/*---------- DONE ----------*/