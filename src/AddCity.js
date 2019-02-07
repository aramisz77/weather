import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from './actions';
import { capitalsearch } from './captials';
import Navbar from './Navbar';

class AddCity extends Component {

    state = {
        searchterm: '',
        option: 0,
        cityoptions: []
    }

    searchInput = React.createRef();


    setOption = (val) => {
            if (val > -1 && val < this.state.cityoptions.length) {
            this.setState({ option: val })
        }
    }

    keydown = (evt) => {
        const key = evt.key;
        const keys = {
            'ArrowUp': () => { this.setOption(this.state.option - 1) },
            'ArrowDown': () => { this.setOption(this.state.option + 1) },
            'Enter': () => {
                const city = this.state.cityoptions[this.state.option];
                if (city) { this.cityclick(city) }
            }
        }

        if (key in keys) {
            evt.preventDefault();
            keys[key]();
        }

    }

    cityclick = (searchterm) => {
        const option = 0;
        const cityoptions = capitalsearch(searchterm, this.props.cities);
        this.setState({ searchterm, option, cityoptions });
    }

 

    save = () => {
        this.props.fetchWeather(this.state.searchterm);        
        this.props.history.push('/');
    }

    componentDidMount() {
        this.searchInput.current.focus();
    }

    render() {
        const cityoptions = this.state.cityoptions;
        const selected = (cityoptions.length === 1) && (cityoptions[0] === this.state.searchterm);
        return (
            <>
                <Navbar></Navbar>
                <div className="addcity">
                    <input className="addcity__input" type='text'
                        value={this.state.searchterm}
                        onChange={(evt) => { this.cityclick(evt.target.value) }}
                        onKeyDown={this.keydown}
                        ref={this.searchInput}
                    />
                    {!selected &&
                        <ul className="addcity__list">
                            {cityoptions.map(
                                (city, index) => { return (<li key={city} className={this.state.option === index ? 'addcity__selecteditem' : ''} onClick={() => { this.cityclick(city) }}>{city}</li>); }
                            )}
                        </ul>
                    }
                    {selected &&
                        <button className="addcity__button color-primary" onClick={this.save}>Save</button>
                    }
                </div>
            </>
        );
    }

}

const mapActions = { fetchWeather };

const mapState = (state) => {
    return {
        weather: state.weather,
        cities: Object.keys(state.weather)
    }
}

export default connect(mapState, mapActions)(AddCity);