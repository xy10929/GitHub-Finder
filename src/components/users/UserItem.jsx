import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function UserItem({ user: { login, avatar_url } }) {
  //destructure user
  //login = username
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className='flex-row items-centerspace-x-4 card-body'>
        {/* img */}
        <div>
          <div className='avatar'>
            <div className='rounded-full shadow w-14 h-14'>
              <img src={avatar_url} alt='Profile' />
            </div>
          </div>
        </div>

        {/* username and link to /users/username */}
        <div>
          <h2 className='card-title'>{login}</h2>
          <Link
            className='text-base-content text-opacity-40'
            to={`/user/${login}`}
            //route to user.jsx
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

UserItem.propType = {
  user: PropTypes.object.isRequired,
}

export default UserItem
