import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import movieAPI from '../../services/movie-api';
import routes from '../../routes';
import './MovieDetailsPage.css';

export default class MovieDetailsPage extends Component {
    state = {
        movie: null,
        reviews: null,
        cast: null,
        error: null,
        loading: false,
    };

    componentDidMount() {
        this.setState({
            loading: true,
        });
        movieAPI
            .fetchMovieDetails(this.props.match.params.movieId)
            .then(movie =>
                this.setState({
                    movie,
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
                }),
            );
    }

    handleGoBack = () => {
        const { state } = this.props.location;

        if (state && state.from) {
            return this.props.history.push(state.from);
        }
        this.props.history.push(routes.movies);
    };

    render() {
        const { loading, movie } = this.state;
        const { match, location } = this.props;
        let year;
        let score;
        let genres;

        if (movie) {
            year = movie.release_date.substring(0, 4);
            score = movie.vote_average * 10;
            genres = movie.genres;
            genres = genres
                .map(genre => Object.values(genre))
                .map(res => res[1])
                .join(' ');
        }

        // console.log(this.props.location.state);

        return (
            <div className="MovieDetailsPage-container">
                <button
                    className="MovieDetailsPage-button"
                    type="button"
                    onClick={this.handleGoBack}
                >
                    Go back{' '}
                </button>{' '}
                {loading && (
                    <Loader
                        type="Bars"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                )}{' '}
                {movie && (
                    <>
                        <div className="MovieDetailsPage-block">
                            <img
                                className="MovieDetailsPage-img"
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.original_title}
                            ></img>{' '}
                            <div className="MovieDetailsPage-block--text">
                                <h1 className="MovieDetailsPage-title">
                                    {' '}
                                    {`${movie.original_title} (${year})`}{' '}
                                </h1>{' '}
                                {/* <span className="MovieDetailsPage-rate">
                              
                              {`User Score: ${score}%`}
                            </span> */}{' '}
                                <div
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                >
                                    <CircularProgressbar
                                        value={score}
                                        text={`${score}%`}
                                    />{' '}
                                </div>
                                <p className="MovieDetailsPage-sub-title">
                                    {' '}
                                    Overview{' '}
                                </p>{' '}
                                <p className="MovieDetailsPage-description">
                                    {' '}
                                    {movie.overview}{' '}
                                </p>{' '}
                                <p className="MovieDetailsPage-sub-title">
                                    {' '}
                                    Genres{' '}
                                </p>{' '}
                                <p className="MovieDetailsPage-description">
                                    {' '}
                                    {genres}{' '}
                                </p>{' '}
                            </div>{' '}
                        </div>{' '}
                        <Link
                            className="MovieDetailsPage-link"
                            to={{
                                pathname: `${routes.movies}/${movie.id}/credits`,
                                state: location.state,
                            }}
                        >
                            cast &#8594;{' '}
                        </Link>{' '}
                        <Link
                            className="MovieDetailsPage-link"
                            to={{
                                pathname: `${routes.movies}/${movie.id}/reviews`,
                                state: location.state,
                            }}
                        >
                            reviews &#8594;{' '}
                        </Link>{' '}
                        <Route
                            path={`${match.path}/credits`}
                            component={Cast}
                        />{' '}
                        <Route
                            path={`${match.path}/reviews`}
                            component={Reviews}
                        />{' '}
                    </>
                )}{' '}
            </div>
        );
    }
}
