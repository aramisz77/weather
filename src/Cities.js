import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Cities extends Component {
    render() {
        const cities = this.props.cities;
        return (
            <ul>
                {cities.map(city => { return (<li key={city}><Link className='link' to="/about">{city}</Link></li>); })}
                <li key='+'><Link className='link' to='/addcity'>+</Link></li>
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