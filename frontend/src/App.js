import React, { Component } from 'react';
import Login from './components/Login/Login'
import NotesApp from "./components/NotesApp";

class App extends Component {

    state = {
      loggedIn: localStorage.getItem('token') ? true : false
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
                  <div>
                      <Login onLogin={this.handleLogin}/>
                  </div>
          }
      </div>
    );
  }
}
export default App;