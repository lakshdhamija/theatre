import React from "react";
import userStore from "../store/UserStore";


class SubmitButton extends React.Component {
    
    render() {
        return <div className= "submit-button">
            <button className="btn" disabled={this.props.disabled} onClick={() => this.props.onClick()}>
                {this.props.text}
            </button>
        </div>;
    }
}

export default SubmitButton;
