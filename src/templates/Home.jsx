import React from 'react'
import { getUserId, getUsername } from '../reducks/users/selectors'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '../reducks/users/operations'

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  const uname = getUsername(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>User ID :{uid}</p>
      <p>User Name :{uname}</p>
      <button onClick={() => dispatch(signOut())}>Sign out</button>
    </div>
  )
}

export default Home
