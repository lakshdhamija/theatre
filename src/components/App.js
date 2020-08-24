import React from "react";
import {observer} from "mobx-react";
import "../css/App.css";
import UserStore from "../store/UserStore";
import LoginForm from "./LoginForm";

class App extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch(
        "http://18.220.240.163:8080/rest/authenticate/login",
        {
          method: "post",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      let result = res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.token = result.result.accessToken;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
      console.log(e);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="App">
          <div className="container">Loading...</div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="App">
            <div className="container">You are Logged In</div>
          </div>
        );
      }
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
