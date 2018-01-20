export function reducerLogUserOut(state = { userInfo: {} },  action) {
  switch (action.type) {
    case 'LOG_USER_OUT': 
      return Object.assign({}, state, {
	    isLoggedIn: false,
	    globalFeed: {},
	    userFeed: {},
	    balance: null,
	    userInfo: {}
      })
    default: 
      return state;
  }
}

/* Description: This reducer looks to log the user out. */

/*---------- DONE ----------*/
