import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(29),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title:  {
    fontWeight: 650,
    margin: theme.spacing(1)

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  signUp: {
    fontWeight: 600,
    float: 'right'
  },
  signUpButton: {
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

class SignUp extends Component {

    state = {
      firstName: '',
      secondName: '',
      email: '',
      password: ''
    };

  render() {

    const {classes} = this.props

    return (
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography className={classes.title} component="h2" variant="h4">
               SignUp
            </Typography>
            <form className={classes.form} noValidate onSubmit={(e) => this.props.onSignup(e, this.state)}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) =>{
                        this.setState({firstName: e.target.value})
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={(e) =>{
                        this.setState({secondName: e.target.value})
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) =>{
                        this.setState({email: e.target.value})
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
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
                </Grid>
            </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.signUpButton}
              >
                Sign Up
              </Button>
              <Grid container justify='flex-end'>
                <Grid item>
                  <Link className={classes.signUp} onClick={() => this.props.onLoginClicked()} variant="body2">
                    {"Already have an Account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    )
  }
}
export default withStyles(styles)(SignUp)