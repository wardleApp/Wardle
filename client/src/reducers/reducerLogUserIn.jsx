export function reducerLogUserIn(state = { errorMessage: '', isLoggedIn: false, userInfo: {} },  action) {
  switch (action.type) {
    case 'LOGIN_ERROR': 
      return Object.assign({}, state, {
      	errorMessage: 'Error' 
      })
    case 'LOG_USER_IN': 
      return Object.assign({}, state, {
      	isLoggedIn: true
      })
    default: 
      return state;
  }
}

/* Description: This function changes the "isLoggedIn" state depending on whether 
the user was able to successfully sign in.
*/

/*---------- DONE ----------*/