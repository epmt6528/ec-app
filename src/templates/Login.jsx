import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { signInAction } from '../reducks/users/actions'

const Login = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)

  console.log(selector.router)
  console.log(selector.users)

  return (
    <div>
      <h2>Log in</h2>
      <button
        onClick={() => {
          dispatch(signInAction({ uid: '00001', username: 'taichi' }))
          dispatch(push('/'))
        }}
      >
        Log me in
      </button>
    </div>
  )
}

export default Login
