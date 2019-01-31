import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearch } from './actions';
import { search } from './captials';

class SearchOptions extends Component {


    cityclick = (city) => {
        this.props.setSearch(city);
    }

    render() {

        const options = search(this.props.search, this.props.cities);

        return (

            <ul>
                {options.map(city => { return (<li key={city} onClick={() => { this.cityclick(city) }}>{city}</li>); })}
            </ul>

        );
    }

}

const mapActions = { setSearch };

const mapState = (state) => {
    return {
        cities: state.cities,
        search: state.search
    }
}

export default connect(mapState, mapActions)(SearchOptions);