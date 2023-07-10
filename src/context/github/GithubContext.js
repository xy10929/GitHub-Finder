import { createContext, useState } from 'react'

const GithubContext = createContext()
//2.create context, which will be exported as interface

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  //the fuction should be exported, and
  //return GithubContext.GithubProvider component that wraps the argument of the function

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        //set token inside the app
      },
    })
    const data = await response.json()

    //3.fetch the data, and set as state--users
    setUsers(data)
    setLoading(false)
  }

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
      }}
      //the value props of the component describes states & functions that malipulate states(also defined in the export function)
      //4.the  data and loading state + fetchUsers function will be passed by interface - GithubContext
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
