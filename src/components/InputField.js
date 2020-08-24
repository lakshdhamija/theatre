import React from "react";

class InputField extends React.Component {
  render() {
    return (
      <div className="input-field">
        <input
          className="input"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)} // function that will store target value in state 
        />
      </div>
    );
  }
}

export default InputField;
