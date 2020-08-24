import React from "react";
import UserStore from "../store/UserStore";
import Dropdown from "./Dropdowwn";
import SubmitButton from "./SubmitButton";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "1",
      subcategoryId: "1",
      topicId: "1",
      buttonDisabled: false,
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
  async doSubmit() {
    const { categoryValues, subcategoryValues, topicValues } = this.state;
    if (
      categoryValues.length === 0 ||
      subcategoryValues.length === 0 ||
      topicValues.length === 0
    ) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });
    try {
      let res = await fetch("http://18.220.240.163:8080/rest/admin/matches", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: UserStore.token,
        },
        body: JSON.stringify({
          name: "Friend match2",
          imageUrl: "newurl",
          categoryId: this.state.categoryId,
          subCategoryId: this.state.subcategoryId,
          topicId: this.topicId,
          startDate: "2020-08-07T18:30:00.000Z",
          endDate: "2021-08-25T18:30:00.000Z",
        }),
      });
      let result = await res.json();
      if (result && result.success) {
        alert(`Success: ${result.success}`);
      } else if (result && result.success === false) {
        alert(`Success: ${result.success}`);
      }
      this.setState({ buttonDisabled: false });
    } catch (e) {
      console.log(e);
    }
  }
  setInputValue(property, val) {
    val = val.trim();
    this.setState({
      [property]: val,
    });
  }
  render() {
    if (this.state.loading) {
      return <div className="form">Loading...</div>;
    } else {
      return (
        <div className="form">
          <Dropdown
            list={this.state.categoryValues}
            onChange={(val) => this.setInputValue("categoryId", val)}
          />
          <Dropdown
            list={this.state.subcategoryValues}
            onChange={(val) => this.setInputValue("subcategoryId", val)}
          />
          <Dropdown
            list={this.state.topicValues}
            onChange={(val) => this.setInputValue("topicsId", val)}
          />
          <SubmitButton
            text="Submit"
            disabled={this.state.buttonDisabled}
            onClick={() => this.doSubmit()}
          />
        </div>
      );
    }
  }
}

export default Form;
