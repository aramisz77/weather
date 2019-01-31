import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearch } from './actions';

class SearchCity extends Component {
 
    valueChange = (evt) => { this.props.setSearch(evt.target.value) }
  
    render() {
        return (
            <>
                <input type='text'
                    value={this.props.search}
                    onChange={this.valueChange}
                />              
            </>
        );
    }

}

const mapActions = { setSearch };

const mapState = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapState, mapActions)(SearchCity);