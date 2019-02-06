import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCity, fetchWeather } from './actions';
import { capitalsearch } from './captials';

class AddCity extends Component {

    state = { searchterm: '' }

    searchInput = React.createRef();

    valueChange = (evt) => { this.setState({ searchterm: evt.target.value }) }

    cityclick = (city) => { this.setState({ searchterm: city }) }

    back = () => { this.props.history.goBack() }

    save = () => {
        this.props.addCity(this.state.searchterm);
        this.props.fetchWeather(this.state.searchterm);
        this.props.history.push('/');
    }

    componentDidMount() {
        this.searchInput.current.focus();
    }

    render() {
        const cityoptions = capitalsearch(this.state.searchterm, this.props.cities);
        const selected = (cityoptions.length === 1) && (cityoptions[0] === this.state.searchterm);
        return (
            <>
                <div className="navbar">
                    <img src="/arrow-back.png" alt="back" onClick={this.back}></img>
                </div>
                <div className="offset-by-one-third one-third column">
                    <input type='text'
                        value={this.state.searchterm}
                        onChange={this.valueChange}
                        ref={this.searchInput}
                    />
                    {!selected &&
                        <ul>
                            {cityoptions.map(city => { return (<li key={city} onClick={() => { this.cityclick(city) }}>{city}</li>); })}
                        </ul>
                    }
                    {selected &&
                        <button onClick={this.save}>Save</button>
                    }
                </div>
            </>
        );
    }

}

const mapActions = { addCity, fetchWeather };

const mapState = (state) => {
    return {
        cities: state.cities
    }
}

export default connect(mapState, mapActions)(AddCity);