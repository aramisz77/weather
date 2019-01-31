import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Cities extends Component {
    render() {
        const cities = this.props.cities;
        return (
            <ul>
                {cities.map(city => { return (<li><Link class='link' to="/about">{city}</Link></li>); })}
                <li><Link class='link' to='/'>+</Link></li>
            </ul>
        );
    }
}

const mapState = (state) => {
    return {
        cities: state.cities
    }
}

export default connect(mapState)(Cities);