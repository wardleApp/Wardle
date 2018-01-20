export function loginAttempt(state = { isLoggedIn: false },  action) {
  switch (action.type) {
    case 'DATABASE_ERROR': 
      return Object.assign({}, state, 
      {
        message: 'Error'
      })
    case 'LOGIN_SUCCESS': 
      return Object.assign({}, state, 
      {
        isLoggedIn: true
      })

    default: 
      return state;
  }
}