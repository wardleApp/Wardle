export function actionSignUpAuthError() {
  return { 
    type: 'SIGN_UP_AUTH_ERROR', 
  }
}

export function actionSignUpComponentError() {
  return {
    type: 'SIGN_UP_COMPONENT_ERROR'
  }
}

export function actionSignUpSubmitted() {
  return {
    type: 'SIGN_UP_SUBMISSION_IN_PROGRESS'
  }
}