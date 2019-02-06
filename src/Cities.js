import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Cities extends Component {
    render() {
        const cities = this.props.cities;
        return (
            <div className="cities center">           
                <ul className="cities__list">
                    {cities.map(city => { return (<li key={city}><Link className='cities__link' to={`/weather/${city}`}>{city}</Link></li>); })}
                    <li key='+'><Link className='cities__link cities__link_add' to='/addcity'>+</Link></li>
                </ul>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        cities: state.cities
    }
}

export default connect(mapState)(Cities);