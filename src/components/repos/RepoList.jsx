import RepoItem from './RepoItem'

//get one user's repos array, and rander top10
function RepoList({ repos }) {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='car-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>Lastest Repos</h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

export default RepoList
