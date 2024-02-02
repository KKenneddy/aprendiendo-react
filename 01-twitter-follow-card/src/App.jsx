import './App.css'
import { TwitterFollowCard } from './twitter-follow-card'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo Heraldo',
    isFollowing: false
  }
]

function App () {
  return (
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing}>
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}

export default App
