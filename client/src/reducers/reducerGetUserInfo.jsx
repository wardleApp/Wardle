export function reducerGetUserInfo(state = { userInfo: {} },  action) {
  switch (action.type) {
    case 'GET_USER_INFO': 
      return Object.assign({}, state, {
      	userInfo: action.payload
      })
    default: 
      return state;
  }
}

/* Description: This reducer looks to load the details of the current user on the page. */

/*---------- DONE ----------*/