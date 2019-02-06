import React, { Component } from 'react';
import { withRouter } from "react-router";

class Navbar extends Component {

    back = () => { this.props.history.goBack() }

    render() {
        return (
            <div className="navbar">
                <img className="navbar__back" src="/arrow-back.png" alt="back" onClick={this.back}></img>
            </div>
        );
    }
}

export default withRouter(Navbar);