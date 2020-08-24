import React from "react";
import { observer } from "mobx-react";
import "../css/App.css";
import UserStore from "../store/UserStore";
import LoginForm from "./LoginForm";

class App extends React.Component {
  render() {
    if (UserStore.isLoggedIn) {
      return (
        <div className="App">
          <div className="container">You are Logged In </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="container">
            <LoginForm />
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
