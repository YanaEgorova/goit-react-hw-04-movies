import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import movieAPI from '../../services/movie-api';
import routes from '../../routes';
import './HomePage.css';

export default class HomePage extends Component {
  state = {
    popularMovies: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    movieAPI
      .fetchPopularMovies()
      .then(popularMovies =>
        this.setState({
          popularMovies,
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

  render() {
    const { loading } = this.state;
    return (
      <div className="Home-container">
        <h1 className="Home-title"> Tranding today </h1>{' '}
        {loading && (
          <Loader type="Bars" color="#00BFFF" height={100} width={100} />
        )}{' '}
        {this.state.popularMovies.length > 0 && (
          <ul className="Home-list">
            {' '}
            {this.state.popularMovies.map(movie => (
              <li className="Home-item" key={movie.id}>
                <Link className="Home-link" to={`${routes.movies}/${movie.id}`}>
                  {' '}
                  {movie.original_title}{' '}
                </Link>{' '}
              </li>
            ))}{' '}
          </ul>
        )}{' '}
      </div>
    );
  }
}
