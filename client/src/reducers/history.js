const toggleHistory = (state = { openHistory: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_HISTORY':
      return Object.assign({}, state, {
        open: !state.openHistory
      });
    default:
      return state
  }
}

export default toggleHistory;
