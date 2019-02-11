import React, { Component } from 'react';
import { withRouter } from "react-router";

class Navbar extends Component {

    back = () => { this.props.history.goBack() }

    render() {
        return (
            <div className="navbar">
                <div className="navbar__back" onClick={this.back}></div>
            </div>
        );
    }
}

export default withRouter(Navbar);