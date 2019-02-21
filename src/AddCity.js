import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from './actions';
import { searchCapital } from './captials';
import Navbar from './Navbar';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

class AddCity extends Component {

    state = {
        searchTerm: '',
        currentOption: -1,
        cityOptions: [],
        loading: false
    }

    searchInput = React.createRef();

    searchTerm$ = new Subject();

    componentDidMount() {
        this.searchInput.current.focus();

        this.searchTerm$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            tap(() => { this.setState({ loading: true }) }),
            switchMap((term) => searchCapital(term, this.props.cities)),
            tap(() => { this.setState({ loading: false }) }),
        ).subscribe(cityOptions => {
            this.setState({
                currentOption: -1,
                cityOptions: cityOptions
            })
        });
    }

    componentWillUnmount() {
        this.searchTerm$.complete();
    }

    searchChange = (searchTerm) => {
        this.setState({ searchTerm: searchTerm });
        this.searchTerm$.next(searchTerm);
    }

    searchKeyDown = (evt) => {
        const key = evt.key;
        const keys = {
            'ArrowUp': () => { this.setOption(this.state.currentOption - 1) },
            'ArrowDown': () => { this.setOption(this.state.currentOption + 1) },
            'Enter': () => {
                if (this.canSave()) return this.saveClick();
                const city = this.state.cityOptions[this.state.currentOption];
                if (city) { this.searchChange(city) }
            }
        }

        if (key in keys) {
            evt.preventDefault();
            keys[key]();
        }

    }

    setOption = (val) => {
        if (val >= -1 && val < this.state.cityOptions.length) {
            this.setState({ currentOption: val })
        }
    }

    saveClick = () => {
        this.props.fetchWeather(this.state.searchTerm);
        this.props.history.push('/');
    }

    canSave = () => {
        return (this.state.cityOptions.length === 1) && (this.state.cityOptions[0] === this.state.searchTerm);
    }

    render() {
        const canSave = this.canSave();
        return (
            <>
                <Navbar></Navbar>
                <div className="addcity">
                    {this.state.loading && <div className="addcity_loader"></div>}
                    <input className="addcity__input"
                        type='text'
                        value={this.state.searchTerm}
                        onChange={(evt) => { this.searchChange(evt.target.value) }}
                        onKeyDown={this.searchKeyDown}
                        ref={this.searchInput}
                    />
                    {!canSave &&
                        <ul className="addcity__list">
                            {this.state.cityOptions.map(
                                (city, index) => {
                                    return <li key={city} className={this.state.currentOption === index ? 'addcity__selecteditem' : ''} onClick={() => { this.searchChange(city) }}>
                                        {city}
                                    </li>;
                                }
                            )}
                        </ul>
                    }
                    {canSave &&
                        <button className="addcity__button color-primary" onClick={this.saveClick}>Save</button>
                    }
                </div>
            </>
        );
    }

}

const mapActions = { fetchWeather };

const mapState = (state) => {
    return {
        cities: Object.keys(state.weather)
    }
}

export default connect(mapState, mapActions)(AddCity);