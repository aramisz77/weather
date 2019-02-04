import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Cities extends Component {
    render() {
        const cities = this.props.cities;
        return (
            <div className="offset-by-one-third one-third column">           
                <ul>
                    {cities.map(city => { return (<li key={city}><Link className='link' to={`/weather/${city}`}>{city}</Link></li>); })}
                    <li key='+'><Link className='link' to='/addcity'>+</Link></li>
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