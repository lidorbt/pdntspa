import React, { Component } from 'react';
//import logo from '../../images/logo.svg';
import '../App.css';
import Form from './Form.js';
import firebase from 'firebase';
//import firebaseConfig from '../../config';

const firebaseConfig = {
  apiKey: "AIzaSyATX9F6uqoaJcF04txbei6s7gLpZe5DHHA", //"AIzaSyAaODb7bCoZPvV4gdVyG_sV_Lc1_GuVdwg",
  authDomain: "pdntspa-tira.firebaseapp.com", //"react-intro-37cd1.firebaseapp.com",
  databaseURL: "https://pdntspa-tira.firebaseio.com" ,//"https://react-intro-37cd1.firebaseio.com",
  projectId: "pdntspa-tira", //"react-intro-37cd1",
  storageBucket: "pdntspa-tira.appspot.com", //"react-intro-37cd1.appspot.com",
  messagingSenderId: "181293593583"
}

firebase.initializeApp(firebaseConfig);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  handleSignIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    let user;
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token.
      let token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
    }).then(() => {
      this.setState({ user: user.displayName });
    });
  }
  handleLogOut() {
    firebase.auth().signOut();
  }
  render() {
    return (
      <div className="app">
        <div className="app__header">

          <h2>
            SIMPLE APP WITH REACT
          </h2>
          { !this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Sign in
            </button>
          ) : (
            <button
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </button>
          )}
        </div>
        <div className="app__list">
          <Form user={this.state.user} />
        </div>
      </div>
    );
  }
}
export default App;