import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()
//2.create context, which will be exported as interface

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  //the fuction should be exported, and return GithubContext.GithubProvider component that wraps the argument of the function

  const initialState = {
    users: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)
  //state is intialized as initialState
  //4.githubReducer gets state & action as arguments, and changes state based on action(its type and payload property)

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        //set token inside the app
      },
    })
    const data = await response.json()
    //2.fetch data

    //3.dispatch func sets action object, passing it to githubReducer func and launch the function
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  return (
    <GithubContext.Provider
      //6.send [data and loading state(changed by githubReducer func) + fetchUsers func] to other components
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
      //the value props of the component describes states & functions that malipulate states(also defined in the export function)
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
