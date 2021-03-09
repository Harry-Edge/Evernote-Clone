import React, {Component} from 'react';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {fade} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import {withStyles} from "@material-ui/core/styles";
import BrushIcon from '@material-ui/icons/Brush'

const styles = theme => ({
     root: {
        flexGrow:1,
    },
    title: {
        flexGrow: 1,
        fontWeight: 600

    },
    user: {
         color: 'green',
         flexGrow: 1
    },
    topNav: {
         backgroundColor: 'transparent',
         color: 'black'
    },

    logoutButton: {
         fontWeight: 650,
         maxHeight: '32px'

    },

    search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.09),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.13),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    },
    searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
    inputRoot: {
    color: 'inherit',
    },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
    },
  },
})

class Header extends Component {

    render() {

        const {classes, user} = this.props

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.topNav}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h4" >
                            <BrushIcon/>
                            Evernote Clone
                        </Typography>
                        <Typography className={classes.user} variant="h6">
                            {user.first_name} {user.last_name}
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                              <SearchIcon />
                            </div>
                            <InputBase
                              placeholder="Search Notes…"
                              classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                              }}
                              inputProps={{ 'aria-label': 'search' }}
                              onChange={(e) => {
                                  this.props.onSearchNotes(e.target.value)
                              } }
                            />
                        </div>
                        <Button variant="contained" className={classes.logoutButton} onClick={() => this.props.onLogout()} color='secondary' >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default withStyles(styles)(Header)