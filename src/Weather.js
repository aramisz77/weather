import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchWeather } from './actions'

class Weather extends Component {

    city = this.props.match.params.city;

    componentDidMount() {
        this.props.fetchWeather(this.city);
        console.log(this.props.weather);
    }

    render() {

        const weather = this.props.weather[this.city].weather[0];
        return (
            <>
            
                <div className="navbar">
                    <img src="/arrow-back.png" alt="back" onClick={this.back}></img>
                </div>               
                {weather.description}
                <i className={`wi wi-owm-${weather.id}`}></i>
            </>
        );
    }
}


const mapState = (state) => {
    return {
        weather: state.weather
    }
}

const mapActions = { fetchWeather }

export default connect(mapState, mapActions)(Weather);