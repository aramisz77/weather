import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCity, setSearch } from './actions';
import SearchCity from './SearchCity';
import SearchOptions from './SearchOptions';

class AddCity extends Component {

    
    save = () => {
        this.props.addCity(this.props.search); 
        this.props.setSearch('');     
        this.props.history.push('/');
    }

    render() {
        return (
            <>
               <SearchCity></SearchCity>
               <SearchOptions></SearchOptions>
                <button onClick={this.save}>
                    Save
                </button>
            </>
        );
    }

}

const mapActions = { addCity, setSearch };

const mapState = (state) => {
    return {
        cities: state.cities,
        search: state.search
    }
}

export default connect(mapState, mapActions)(AddCity);