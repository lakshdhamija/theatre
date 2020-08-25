import React from "react";
import UserStore from "../store/UserStore";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { // craete default state
      userName: "",
      password: "",
      buttonDisabled: false,
    };
  }

  //function to set Value of username and password
  setInputValue(property, val) {
    val = val.trim();
    this.setState({
      [property]: val,
    });
  }

  // function to reset the form incase of errors
  resetForm() {
    this.setState({
      userName: "",
      password: "",
      buttonDisabled: false,
    });
  }

  // function to login 
  async doLogin() {
    if (!this.state.userName || !this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });
    try {
      let res = await fetch(
        "http://18.220.240.163:8080/rest/authenticate/login",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: this.state.userName,
            password: this.state.password,
          }),
        }
      );
      let result = await res.json();
      if (result && result.success) { // if response is successful
        UserStore.isLoggedIn = true;
        UserStore.userName = this.state.userName;
        UserStore.token = 'Bearer ' + result.result.accessToken; // store JWT
      } else if (result && result.success === false) { // if response is not successful
        this.resetForm();
        alert(result.result.message);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }
  render() {
    return (
      <div className="login-form">
        
        <p>Login Form</p>

        <InputField // input field for username
          type="text"
          placeholder="Username"
          icon='far fa-user'
          value={this.state.userName ? this.state.userName : ""}
          onChange={(val) => this.setInputValue("userName", val)}
        />
        <InputField // input field for password
          type="password"
          icon='fas fa-key'
          placeholder="Password"
          value={this.state.password ? this.state.password : ""}
          onChange={(val) => this.setInputValue("password", val)}
        />
        <SubmitButton // button to submit username and password and generate JWT
          text="Login"
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />
      </div>
    );
  }
}

export default LoginForm;
