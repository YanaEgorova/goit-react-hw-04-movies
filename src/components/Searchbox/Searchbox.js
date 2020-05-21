import React, { Component } from 'react';
import './Searchbox.css';

export default class Searchbox extends Component {
    state = {
        value: '',
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
        this.setState({
            value: '',
        });
    };

    render() {
        const { value } = this.state;
        return (
            <form className="Searchbox-form" onSubmit={this.handleSubmit}>
                <input
                    className="Searchbox-input"
                    type="text"
                    value={value}
                    onChange={this.handleChange}
                />{' '}
                <button className="Searchbox-button" type="submit">
                    {' '}
                    Search{' '}
                </button>{' '}
            </form>
        );
    }
}
