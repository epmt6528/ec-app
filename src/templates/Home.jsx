import React from 'react'
import { getUserId, getUsername } from '../reducks/users/selectors'
import { useSelector } from 'react-redux'

const Home = () => {
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  const uname = getUsername(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>User ID :{uid}</p>
      <p>User Name :{uname}</p>
    </div>
  )
}

export default Home
