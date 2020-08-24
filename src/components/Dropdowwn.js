// @flow
import * as React from "react";

class Dropdown extends React.Component {
  render() {
    return (
      <select className="dropdown" onChange={(e) => this.props.onChange(e.target.value)}>
        {this.props.list.map((obj) => {
          return (
            <option key={obj.id} value={obj.id}>
              {obj.name}
            </option>
          );
        })}
      </select>
    );
  }
}

export default Dropdown;