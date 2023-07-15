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
    //users -> payload(from dispatch func), which is fetched data
    //10.githubReducer func changes state, replacing state-users with fatched data, and set loading false
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
      }
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    //call getUser to set one user 's data as state-user
    case 'GET_REPOS':
      return {
        ...state,
        repos: action.payload,
        loading: false,
      }
    //call getUserRepos to set one user 's repos as state-repos
    default:
      return state
  }
}

export default githubReducer
