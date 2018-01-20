export function reducerGetBalance(state = { balance: null },  action) {
  switch (action.type) {
    case 'GET_BALANCE': 
      return Object.assign({}, state, {
      	balance: action.payload
      })
    default: 
      return state;
  }
}

/* Description: This reducer looks to set the state of the users balance. */

/*---------- DONE ----------*/