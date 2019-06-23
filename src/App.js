import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from './firebase';

class App extends Component {
  state = {
    email: '',
    password: '',
    user: ''
  }

  signIn = async () => {
    await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ user: firebase.auth().currentUser })
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    console.log('Connecté')
  }

  logout = async () => {
    await firebase.auth().signOut()
    this.setState({ user: null })
    console.log('Déconnecté')
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.signIn();
  }

  render() {
    let data = ''

    if (this.state.user) {
      data = (
        <Fragment>
          <p>Bonjour {this.state.user.email}</p>
          <button onClick={this.logout}>Se déconnecter</button>
        </Fragment>
      )
    } else {
      data = (
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.email} onChange={this.handleChange} name='email' type='text' placeholder='email' /><br />
          <input value={this.state.password} onChange={this.handleChange} name='password' type='password' placeholder='password' /><br />
          <button type='submit'>Se connecter</button>
        </form>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {data}
        </header>
      </div>
    );
  }
}

export default App;
