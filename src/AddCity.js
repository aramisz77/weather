import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCity } from './actions';
import { capitalsearch } from './captials';

class AddCity extends Component {

    state = { searchterm: '' }

    searchInput = React.createRef();

    valueChange = (evt) => { this.setState({ searchterm: evt.target.value }) }

    cityclick = (city) => { this.setState({ searchterm: city }) }

    save = () => {
        this.props.addCity(this.state.searchterm);        
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
            </>
        );
    }

}

const mapActions = { addCity };

const mapState = (state) => {
    return {
        cities: state.cities
    }
}

export default connect(mapState, mapActions)(AddCity);