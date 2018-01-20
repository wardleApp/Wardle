export function reducerSignIn(
  state = {       
    profileInfo: {},
    unknownUser: false,
    profileFeed: {},
    relationalFeed: {}
    },  
  action) {
  switch (action.type) {
    case 'UPDATING_PROFILE_NEWS_FEED': 
      return Object.assign({}, state, {
        [action.data.feedType]: action.data
      })

    default: 
      return state;
  }
}

/* Description: This reducer looks to set the state of the users balance. */

/*---------- DONE ----------*/