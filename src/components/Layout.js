import {
    makeStyles, Drawer, Typography,
    List, ListItem, ListItemIcon, ListItemText, IconButton
} from '@material-ui/core'
import { AddCircleOutlineOutlined, Block, SubjectOutlined } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { AppBar, Toolbar, Avatar } from '@material-ui/core'
import { format } from 'date-fns'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        appBar: {
            width: (open) => {
                return open ? `calc(100% - ${drawerWidth}px)` : null
            },
            background: '#ff6833',
        },
        toolBar: theme.mixins.toolbar,
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(6),
        },
        drawer: {
            width: drawerWidth
        },
        hideDrawer: {
            display: 'none'
        },
        drawerPaper: {
            width: drawerWidth
        },
        active: {
            background: "#f8f8f8"
        },
        date: {
            flexGrow: "1",
        },
        avatar: {
            marginLeft: theme.spacing(1)
        },
        drawerHeader: {
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        hideButton: {
            display: 'none'
        }
    }
})

export default function Layout({ children }) {
    const [open, setOpen] = useState(false)
    const classes = useStyles(open)
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create'
        }
    ]

    return (
        <div className={classes.root}>
            {/*Appbar*/}
            <AppBar className={classes.appBar} elevation={0}>
                <Toolbar>
                    <IconButton className={open ? classes.hideButton : null} color='inherit' onClick={() => setOpen(!open)}><MenuIcon /></IconButton>
                    <Typography className={classes.date}>Today is {format(new Date(), 'do MMMM Y')}</Typography>
                    <Typography>Bogdan</Typography>
                    <Avatar src='/ava.jpg' className={classes.avatar}></Avatar>
                </Toolbar>
            </AppBar>


            {/*Side drawer*/}
            <Drawer className={open ? classes.drawer : classes.hideDrawer} variant="persistent" anchor="left" open={open}
                classes={{ paper: classes.drawerPaper }} >
                <div className={classes.drawerHeader}>
                    <Typography variant='h5'>
                        MyNotes
                    </Typography>
                    <IconButton onClick={() => setOpen(!open)}><ChevronLeftIcon /></IconButton>
                </div>

                {/*List / links */}
                <List>
                    {menuItems.map(item => (
                        <ListItem key={item.text} button onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : null}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolBar}></div>
                {children}
            </div>
        </div>
    )
}

