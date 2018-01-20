export function reducerLoginAttempt(state = { loginMessage: '', isLoggedIn: false, userInfo: {} },  action) {
  switch (action.type) {
    case 'DATABASE_ERROR': 
      return Object.assign({}, state, {
      	loginMessage: 'Error' 
      })
    case 'LOGIN_USER_IN': 
      return Object.assign({}, state, {
      	isLoggedIn: true,
        userInfo: action.payload
      })
    default: 
      return state;
  }
}

/* Description: This function changes the "isLoggedIn" state depending on whether 
the user was able to successfully sign in.
*/

/*---------- DONE ----------*/