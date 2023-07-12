import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'

function UserSearch() {
  const [text, setText] = useState('')
  //3.set text as '', hooked by setText
  const handleChange = (e) => setText(e.target.value)
  //5.get input from search bar

  const { users, searchUsers, clearUsers } = useContext(GithubContext)

  const handleSubmmit = (e) => {
    e.preventDefault()
    if (text === '') {
      alert('Please enter something')
    } else {
      searchUsers(text)
      //6.call for fetaching data based on user input
      setText('')
    }
  }

  //4.dislay the homepage with initialState
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmmit}>
          <div className='form-control'>
            <div className='relative'>
              {/* for search bar*/}
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              {/* search button */}
              <button
                type='submit'
                className='absolute top-0 right-0 round-l-none w-56 btn btn-lg'
              >
                GO
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          {/* clear button */}
          <button className='btn btn-ghost btn-lg' onClick={clearUsers}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
