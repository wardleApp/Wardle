export function reducerSignIn(
  state = {       
      submitted: false,
      didSignupFail: false,
      errorCode: null 
    },  
  action) {
  switch (action.type) {
    case 'SIGN_UP_AUTH_ERROR': 
      return Object.assign({}, state, {
        didSignupFail: true,
        errorCode: 422
      })

    case 'SIGN_UP_COMPONENT_ERROR':
      return Object.assign({}, state, {
        didSignupFail: true,
        errorCode: 500
      })

    case 'SIGN_UP_SUBMISSION_IN_PROGRESS': 
      return Object.assign({}, state, {
        submitted: !state.submitted
      })

    default: 
      return state;
  }
}

/* Description: This reducer looks to set the state of the users balance. */

/*---------- DONE ----------*/