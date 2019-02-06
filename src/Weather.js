import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchWeather } from './actions'
import { getcapitalTZ } from './captials';
import * as moment from 'moment-timezone';

class Weather extends Component {

    city = this.props.match.params.city;

    state = { hours: '', minutes: '' }

    timer

    back = () => { this.props.history.goBack() }

    update = () => {
        this.props.fetchWeather(this.city);
        const time = moment().tz(getcapitalTZ(this.city));
        const hours = time.hours();
        const minutes = time.minutes();

        this.setState({ hours, minutes });
    }

    componentDidMount() {
        this.update();
        this.timer = setInterval(this.update, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {

        const weather = this.props.weather[this.city];


        if (!weather) {
            return (<div>loading</div>)
        } else {
            return (
                <>

                    <div className="navbar">
                        <img src="/arrow-back.png" alt="back" onClick={this.back}></img>
                    </div>
                    <div className="weathercontainer">
                        <div className="weather center">
                            <div className="color-strong size-m">{this.state.hours}<br />{this.state.minutes}</div>
                            {this.city}
                        </div>
                        <div className="weather center">
                            <div className="color-primary size-l">
                                <i className={`wi wi-owm-${weather.weather[0].id}`}></i>
                            </div>

                            <div className="size-s">{weather.weather[0].description}</div>
                        </div>
                        <div className="weather">
                            <div>
                                <i className="wi wi-fw wi-thermometer color-accent"></i>
                                <span className="weather__data color-primary">
                                    {Number(weather.main.temp - 273.15).toFixed(0)} <i className="wi wi-celsius"></i>
                                </span>
                            </div>
                            <div>
                                <i className="wi wi-fw wi-sunrise color-accent"></i>
                                <span className="weather__data color-primary">
                                    {moment(weather.sys.sunrise * 1000).tz(getcapitalTZ(this.city)).format('HH:mm')}
                                </span>
                            </div>
                            <div>
                                <i className="wi wi-fw wi-sunset color-accent"></i>
                                <span className="weather__data color-primary">
                                    {moment(weather.sys.sunset * 1000).tz(getcapitalTZ(this.city)).format('HH:mm')}
                                </span>
                            </div>
                        </div>
                    </div>

                </>
            );
        }
    }
}


const mapState = (state) => {
    return {
        weather: state.weather        
    }
}

const mapActions = { fetchWeather }

export default connect(mapState, mapActions)(Weather);