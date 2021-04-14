import React, { useCallback, useState } from 'react'

import { PrimaryButton, TextInput } from '../components/UIkit'

import { signIn } from '../reducks/users/operations'

import { useDispatch } from 'react-redux'

import { push } from 'connected-react-router'

const SignIn = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('')

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value)
    },
    [setPassword]
  )

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )

  return (
    <div className='c-section-container'>
      <h2 className='u-text__headline u-text-center'>Sign In</h2>
      <div className='module-spacer--medium' />
      <TextInput
        fullWidth={true}
        label={'Email'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'Password'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <div className='module-spacer--medium' />
      <div className='center'>
        <PrimaryButton
          label={'Sign In'}
          onClick={() => dispatch(signIn(email, password))}
        />
        <div className='module-spacer--medium' />
        <p onClick={() => dispatch(push('/signup'))}>
          Don't have your account? Sign up today!
        </p>
        <p onClick={() => dispatch(push('/signin/reset'))}>
          Forgot your password?
        </p>
      </div>
    </div>
  )
}

export default SignIn
