import React, { Component } from 'react';
import Login from './components/Login/Login'
import NotesApp from "./components/NotesApp";
import SignUp from "./components/Login/SignUp";

class App extends Component {

    state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      signUp: false
    }

  handleLogin = (e, data) => {

    e.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch('http://localhost:8000/token-auth/', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        this.setState({
          loggedIn: true,
        });
      });
  };
  handleSignUpOrLoginClicked = () => {
      this.setState({signUp: !this.state.signUp})
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: false, username: '' });
  };

  render() {
    return (
      <div>
          {
              this.state.loggedIn ?
                  <div>
                      <NotesApp onLogout={this.handleLogout}/>
                  </div>
                  :
                  this.state.signUp ?
                    <div>
                      <SignUp onLogin={this.handleSignUpOrLoginClicked}/>
                    </div>
                  : <div>
                      <Login onSignUp={this.handleSignUpOrLoginClicked} onLogin={this.handleLogin}/>
                    </div>
          }
      </div>
    );
  }
}
export default App;