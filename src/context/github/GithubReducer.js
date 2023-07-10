const githubReducer = (state, action) => {
  switch (action.type) {
    //action.type property(a string) chooses the conditional state transition
    //action.payload property provides information for the state transition
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    //5.githubReducer func change state
    //user -> payload(from dispatch func), which is fetched data
    //loading -> false
    default:
      return state
  }
}

export default githubReducer
