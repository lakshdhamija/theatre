import React from "react";
import { observer } from "mobx-react";
import "../css/App.css";
import UserStore from "../store/UserStore";
import LoginForm from "./LoginForm";
import Form from './Form';

class App extends React.Component {
  render() {
    // check if user is logged in
    if (UserStore.isLoggedIn) {
      return (
        <div className="App">
          <p>Welcome {UserStore.userName}, You are Logged In</p> 
          <Form />
        </div>
      );
    } else { // otherwise display login form
      return (
        <div className="App">
            <LoginForm />
        </div>
      );
    }
  }
}

export default observer(App);
