import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import movieAPI from '../../services/movie-api';
// import imagePathFemale from '../../assets/female.jpg';
// import imagePathMale from '../../assets/male.png';
import './Cast.css';

export default class Cast extends Component {
    state = {
        cast: [],
        error: null,
        loading: false,
        loaded: false,
    };

    componentDidMount() {
        this.setState({
            loading: true,
        });
        movieAPI
            .fetchActors(Number(this.props.match.params.movieId))
            .then(cast =>
                this.setState({
                    cast,
                }),
            )
            .catch(error =>
                this.setState({
                    error,
                }),
            )
            .finally(() =>
                this.setState({
                    loading: false,
                    loaded: true,
                }),
            );
    }

    render() {
        const { loading, loaded, cast } = this.state;
        return (
            <div>
                {' '}
                {loading && (
                    <Loader
                        type="Bars"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                )}{' '}
                {this.state.cast && (
                    <ul className="Cast-list">
                        {' '}
                        {this.state.cast.map(cast => (
                            <li className="Cast-item" key={cast.id}>
                                {' '}
                                {
                                    <>
                                        {' '}
                                        {!cast.profile_path && (
                                            <img
                                                className="Cast-img"
                                                src="https://elecnovo.com/img/icon-user.png"
                                                alt=""
                                            ></img>
                                        )}
                                        <img
                                            className="Cast-img"
                                            src={`https://image.tmdb.org/t/p/w500//${cast.profile_path}`}
                                            alt=""
                                        ></img>{' '}
                                        <p className="Cast-name">
                                            {' '}
                                            {cast.name}{' '}
                                        </p>{' '}
                                        <p className="Cast-character">
                                            {' '}
                                            {cast.character}{' '}
                                        </p>{' '}
                                    </>
                                }{' '}
                            </li>
                        ))}{' '}
                    </ul>
                )}{' '}
                {cast.length === 0 && loaded && (
                    <p className="Cast-text">
                        {' '}
                        We don 't have any cast for this movie{' '}
                    </p>
                )}{' '}
            </div>
        );
    }
}
