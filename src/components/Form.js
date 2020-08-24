import React from "react";
import UserStore from "../store/UserStore";
import Dropdown from './Dropdowwn';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categoryValues: [],
      subcategoryValues: [],
      topicValues: [],
    };
  }
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
  async componentDidMount() {
    await this.timeout(100);
    try {
      let url = "http://18.220.240.163:8080/rest/admin/";
      let res1 = await fetch(`${url}categories`, {
        method: "get",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: UserStore.token,
        }),
      });
      let res2 = await fetch(`${url}subcategories`, {
        method: "get",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: UserStore.token,
        }),
      });
      let res3 = await fetch(`${url}topics`, {
        method: "get",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: UserStore.token,
        }),
      });

      let result1 = await res1.json();
      let result2 = await res2.json();
      let result3 = await res3.json();
      this.setState({
        categoryValues: result1.result.list,
        subcategoryValues: result2.result.list,
        topicValues: result3.result.list,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    if (this.state.loading) {
      return <div className="form">Loading...</div>;
    } else {
      return (
        <div className="form">
            <Dropdown list={this.state.categoryValues} />
            <Dropdown list={this.state.subcategoryValues} />
            <Dropdown list={this.state.topicValues} />
        </div>
      );
    }
  }
}

export default Form;
