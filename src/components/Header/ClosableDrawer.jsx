import React, { useCallback, useState } from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { TextInput } from '../UIkit'
import { push } from 'connected-react-router'
import { signOut } from '../../reducks/users/operations'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32,
  },
}))

const ClosableDrawer = (props) => {
  const classes = useStyles()
  const { container } = props
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')

  const inputKeyword = useCallback(
    (event) => {
      setKeyword(event.target.value)
    },
    [setKeyword]
  )

  const selectMenu = (event, path) => {
    dispatch(push(path))
    props.onClose(event, false)
  }

  const menus = [
    {
      func: selectMenu,
      label: 'Add Products',
      icon: <AddCircleIcon />,
      id: 'register',
      value: '/product/edit',
    },
    {
      func: selectMenu,
      label: 'Order History',
      icon: <HistoryIcon />,
      id: 'history',
      value: '/order/history',
    },
    {
      func: selectMenu,
      label: 'Profile',
      icon: <PersonIcon />,
      id: 'profile',
      value: '/profile',
    },
  ]

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant='temporary'
        anchor='right'
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div
          onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.onClose(e)}
        >
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={'Search keyword'}
              muliline={false}
              onChange={inputKeyword}
              required={false}
              rows={1}
              value={keyword}
              type={'text'}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem
              button
              key='logout'
              onClick={() => dispatchEvent(signOut())}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Log Out'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
