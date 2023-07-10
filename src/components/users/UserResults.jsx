import { useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from '../users/UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserResults() {
  const { users, loading, fetchUsers } = useContext(GithubContext)

  useEffect(() => {
    fetchUsers()
  }, [])
  //1.useEffect: when loading this component, call fetchUsers function passed by GithubContext, which also brings data & loading state

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          //6.map() users to pass each user to UserItem component
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
