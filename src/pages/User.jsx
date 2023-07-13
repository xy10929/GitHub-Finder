import { useEffect, useContext } from 'react'
import GithubContext from '../context/github/GithubContext'
import { useParams } from 'react-router-dom'
//get the params when using router

function User() {
  const { getUser, user } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
    //set single user 's data as state
  }, [])
  //[]: rander only once

  return <div>{user.login}</div>
}

export default User
