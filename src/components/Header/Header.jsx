import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { getIsSignedIn } from '../../reducks/users/selectors'
import { push } from 'connected-react-router'
import { HeaderMenus, ClosableDrawer } from './index'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444',
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
})

const Header = () => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleDrawerToggle = useCallback(
    (event, open) => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return
      }

      setOpen(open)
    },
    [setOpen]
  )

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.menuBar}>
        <ToolBar className={classes.toolBar}>
          <h1 onClick={() => dispatch(push('/'))}>EC Website</h1>

          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </ToolBar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header
