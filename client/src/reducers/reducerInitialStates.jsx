export function reducerInitialStates(state = {
    isLoggedIn: false,
    globalFeed: {},
    userFeed: {},
    balance: null,
    userInfo: {},
    payeeUsername: '',
    amount: '',
    note: '',
    paymentFail: false,
    usernames: [],
    profileInfo: {},
    unknownUser: false,
    profileFeed: {}
},  action) {
  switch (action.type) {
    case 'INITIALISE_STATES': 
      return state;
    default: 
      return state;
  }
}