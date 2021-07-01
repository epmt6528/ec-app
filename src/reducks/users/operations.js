import {
  signInAction,
  signOutAction,
  fetchProductsInCartAction,
} from './actions'
import { push } from 'connected-react-router'
import { auth, FirebaseTimestamp, db } from '../../firebase/index'

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const cartRef = db.collection('users').doc(uid).collection('cart').doc()
    addedProduct['cartId'] = cartRef.id

    await cartRef.set(addedProduct)

    dispatch(push('/'))
  }
}

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products))
  }
}

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid

        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            )
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    // Validation
    if (email === '' || password === '') {
      alert('Please fill out the form')
      return false
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user

      if (user) {
        const uid = user.uid

        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            )

            dispatch(push('/'))
          })
      }
    })
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validation
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('Please fill out the form')
      return false
    }

    if (password !== confirmPassword) {
      alert('The passwords dont match')
      return false
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: 'customer',
            uid: uid,
            updated_at: timestamp,
            username: username,
          }

          db.collection('users')
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            })
        }
      })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction())
      dispatch(push('/signin'))
    })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === '') {
      alert('Enter your email')
      return false
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            'Password reset instruction has been sent to your email address'
          )
          dispatch(push('/signin'))
        })
        .catch(() => {
          alert('Faild password reset. Try again.')
        })
    }
  }
}
