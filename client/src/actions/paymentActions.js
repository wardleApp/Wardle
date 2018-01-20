export const paymentGetUsernames = (data) => ({
  type: 'GET_USERNAMES',
  data
})

export const paymentInputOnChange = (data) => ({
  type: 'SEARCH_ON_CHANGE',
  data
})

export const paymentDropDown = (text) => ({
  type: 'DROP_DOWN',
  text
})

export const paymentTogglePrivate = () => ({
  type: 'TOGGLE_PRIVATE'
})

export const paymentPayUser = () => ({
  type: 'PAY_USER'
})

export const paymentError = () => ({
  type: 'PAY_ERROR'
})
