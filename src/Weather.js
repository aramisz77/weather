import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchWeather } from './actions'
import * as moment from 'moment-timezone';
import Navbar from './Navbar';

class Weather extends Component {

    state = { hours: '', minutes: '' };
    city = this.props.match.params.city;
    timer;

    componentDidMount() {
        this.updateWeatherAndClock();
        this.timer = setInterval(this.updateWeatherAndClock, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateWeatherAndClock = () => {
        this.props.fetchWeather(this.city);
        const weather = this.props.weather;
        if (weather) {
            const time = moment().tz(weather.timezone);
            const hours = time.format('HH');
            const minutes = time.format('mm');
            this.setState({ hours, minutes });
        }
    }

    render() {

        const weather = this.props.weather;
        const loading = <div className="center size-s color-primary">loading...</div>;

        if (!weather) {
            return (loading)
        } else {
            return (
                <>
                    <Navbar></Navbar>
                    <div className="weathercontainer">
                        <div className="weather center">
                            <div className="color-strong size-m">{this.state.hours}<br />{this.state.minutes}</div>
                            <div>{this.city}</div>
                        </div>
                        <div className="weather center">
                            {weather.timestamp &&
                                <>
                                    <div className="color-primary size-l">
                                        <i className={`wi wi-owm-${weather.code}`}></i>
                                    </div>

                                    <div className="size-s">{weather.description}</div>
                                </>
                            }
                        </div>
                        <div className="weather weather_fixed">
                            {weather.timestamp &&
                                <>
                                    <div>
                                        <i className="wi wi-fw wi-thermometer color-accent"></i>
                                        <span className="weather__data color-primary">
                                            {weather.temperature} <i className="wi wi-celsius"></i>
                                        </span>
                                    </div>
                                    <div>
                                        <i className="wi wi-fw wi-sunrise color-accent"></i>
                                        <span className="weather__data color-primary">
                                            {weather.sunrise}
                                        </span>
                                    </div>
                                    <div>
                                        <i className="wi wi-fw wi-sunset color-accent"></i>
                                        <span className="weather__data color-primary">
                                            {weather.sunset}
                                        </span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    {!weather.timestamp && loading}
                </>
            );
        }
    }
}


const mapState = (state, props) => {
    return {
        weather: state.weather[props.match.params.city]
    }
}

const mapActions = { fetchWeather }

export default connect(mapState, mapActions)(Weather);