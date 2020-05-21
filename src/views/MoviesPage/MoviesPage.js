import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Searchbox from '../../components/Searchbox';
import parseQueryString from '../../utils/parseQueryString';
import movieAPI from '../../services/movie-api';
import './MoviesPage.css';

export default class MoviesPage extends Component {
    state = {
        movies: [],
        error: null,
        loading: false,
    };

    componentDidMount() {
        const {
            query
        } = parseQueryString(this.props.location.search);

        if (query) {
            this.fetchMovies(query);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            query: prevQuery
        } = parseQueryString(
            prevProps.location.search,
        );
        const {
            query: nextQuery
        } = parseQueryString(
            this.props.location.search,
        );

        if (prevQuery !== nextQuery) {
            this.fetchMovies(nextQuery);
        }
    }

    fetchMovies = query => {
        this.setState({
            loading: true,
        });
        movieAPI
            .fetchMovieWithQuery(query)
            .then(res =>
                this.setState({
                    movies: res,
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
    };

    handleChangeQuery = query => {
        if (query) {
            this.props.history.push({
                pathname: this.props.location.pathname,
                search: `query=${query}`,
            });
        }
    };

    render() {
        const {
            movies,
            loading
        } = this.state;
        const {
            match
        } = this.props;

        return ( <
                div className = "MoviePage-container" >
                <
                Searchbox onSubmit = {
                    this.handleChangeQuery
                }
                />{' '} {
                loading && ( <
                    Loader type = "Bars"
                    color = "#00BFFF"
                    height = {
                        100
                    }
                    width = {
                        100
                    }
                    />
                )
            } {
                movies.length > 0 && ( <
                    ul className = "MoviePage-list" > {
                        ' '
                    } {
                        movies.map(movie => ( <
                            li className = "MoviePage-item"
                            key = {
                                movie.id
                            } >
                            <
                            Link className = "MoviePage-link"
                            to = {
                                {
                                    pathname: `${match.url}/${movie.id}`,
                                    state: {
                                        from: this.props.location,
                                    },
                                }
                            } > {
                                ' '
                            } {
                                movie.original_title
                            } {
                                ' '
                            } <
                            /Link>{' '} < /
                            li >
                        ))
                    } {
                        ' '
                    } <
                    /ul>
                )
            } {
                ' '
            } <
            /div>
    );
}
}