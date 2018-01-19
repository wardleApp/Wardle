export function loginAttempt(state = {isLoggedIn: false}, action) {
  switch (action.type) {
    case 'DATABASE_ERROR': 
      return [...state, 
        message: 'Error'
      ]
    case 'LOGIN_SUCCESS': 
      return [...state, 
        isLoggedIn: true
      ]

    default: 
      return state;
  }
}