import React, {
  Component
} from 'react';
import Loader from 'react-loader-spinner';
import movieAPI from '../../services/movie-api';
import './Reviews.css';

export default class Reviews extends Component {
  state = {
    reviews: [],
    error: null,
    loading: false,
    loaded: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    movieAPI
      .fetchReviews(Number(this.props.match.params.movieId))
      .then(reviews =>
        this.setState({
          reviews,
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
    const {
      loading,
      reviews,
      loaded
    } = this.state;
    return ( <
      div > {
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
        ' '
      } {
        reviews && ( <
          ul className = "Reviews-list" > {
            ' '
          } {
            reviews.map(review => ( <
              li className = "Reviews-item"
              key = {
                review.id
              } >
              <
              p className = "Reviews-author" > {
                review.author
              } < /p>{' '} <
              p className = "Reviews-content" > {
                review.content
              } < /p>{' '} < /
              li >
            ))
          } {
            ' '
          } <
          /ul>
        )
      } {
        ' '
      } {
        reviews.length === 0 && loaded && ( <
          p className = "Reviews-text" > {
            ' '
          }
          We don 't have any reviews for this movie < /
          p >
        )
      } {
        ' '
      } <
      /div>
    );
  }
}