const payment = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USERNAMES':
      return Object.assign({}, state, {
        usernames: action.data
      });
    case 'SEARCH_ON_CHANGE':
      return Object.assign({}, state, {
        [action.data.name]: action.data.value
      });
    case 'DROP_DOWN':
      return Object.assign({}, state, {
        payeeUsername: action.data
      });
    case 'TOGGLE_PRIVATE':
      return Object.assign({}, state, {
        private: state.private ? false : true
      });
    case 'PAY_USER':
      return Object.assign({}, state, {
        payeeUsername: '',
        amount: '',
        note: '',
        paymentFail: false,
        private: false
      });
    case 'PAY_ERROR':
      return Object.assign({}, state, {
        paymentFail: true
      });
    default:
      return state
  }
}

export default payment;
