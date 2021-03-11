import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(23),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title:  {
    fontWeight: 650
  },

  avatar: {
    margin: theme.spacing(3),
    backgroundColor: 'green',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  signUp: {
    fontWeight: 600
  },
  signInButton: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    borderBottom: '1px solid black',
    backgroundColor: '#008000',
       fontWeight: 550,
        '&:hover': {
            backgroundColor: '#009900'
        }
  },
});

class Login extends Component {

    state = {
      email: '',
      password: ''
    };

  render() {

    const {classes} = this.props

    return (
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography className={classes.title} component="h2" variant="h3">
               Evernote Clone
            </Typography>
            <form className={classes.form} onSubmit={(e) => this.props.onLogin(e, this.state)} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) =>{
                    this.setState({email: e.target.value})
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) =>{
                    this.setState({password: e.target.value})
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.signInButton}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link onClick={() => {this.props.onSignUpClicked()}} className={classes.signUp} variant="body2">
                    {"Don't have an account?"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    )
  }
}
export default withStyles(styles)(Login)