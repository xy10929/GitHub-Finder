import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  //the fuction should be exported, and return GithubContext.GithubProvider component that wraps the argument of the function

  const initialState = {
    users: [],
    user: {},
    loading: false,
    repos: [],
  }
  //user - one user' s data
  //users - all data loaded

  //1. state is intialized as initialState
  const [state, dispatch] = useReducer(githubReducer, initialState)
  //9. githubReducer func takes state & action as parameters and runs to update state

  //******************************************************
  //initialState -> input in the form -> useState('')、onChange、useState() -> state(text) -> onSubmit -> searchUsers()、fetch() -> fetched data -> dispatch(action) -> githubReducer() -> state which comes up with fetched data -> components rerander
  //*******************************************************

  //get results by searching
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    //7. fetch data from API based on input-text
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      //interact with API
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        //set token inside the app
      },
    })
    const { items } = await response.json()
    //.json(): (when resolved) turn response to a object
    //get items property value(array of users' data from searching)

    //8.dispatch func triggers proccesses of updating state and rerandering
    // data included in action object is sent to githubReducer func
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  //get single user
  const getUser = async (login) => {
    setLoading()

    //interact with API
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        //set token inside the app
      },
    })

    if (response.status === 404) {
      window.location = '/notfound'
    } else {
      //set state as one user 's data
      const data = await response.json()
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  const getUserRepos = async (login) => {
    setLoading()

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    })

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    )
    const data = await response.json()

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
    //payload set as data (object array of one user 's repos)
  }

  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

  //2.rander the parameter(whole page) as state-initialState & searchUsers func(for changing state)
  return (
    <GithubContext.Provider
      value={{
        ...state,
        // users: state.users,
        // loading: state.loading,
        // user: state.user,
        // repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
      //the value props of the component describes states & functions that malipulate states(also defined in the export function)
      //11.the updated state(users & loading) is passed by GithubContext for rerandering
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
