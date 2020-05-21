import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Layout from './Layout.js';
import routes from '../routes';
import '../index.css';

const AsyncHomePage = lazy(() =>
  import('../views/HomePage' /* webpackChunkName: "home-page" */),
);
const AsyncMoviesPage = lazy(() =>
  import('../views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const AsyncMovieDetailsPage = lazy(() =>
  import(
    '../views/MovieDetailsPage' /* webpackChunkName: "movie-detail-page" */
  ),
);

const App = () => (
  <Layout>
    <Suspense
      fallback={<Loader type="Bars" color="#00BFFF" height={100} width={100} />}
    >
      <Switch>
        <Route path={routes.home} exact component={AsyncHomePage} />{' '}
        <Route exact path={routes.movies} exact component={AsyncMoviesPage} />{' '}
        <Route path={routes.movieDetails} component={AsyncMovieDetailsPage} />{' '}
        <Redirect to={routes.home} />{' '}
      </Switch>{' '}
    </Suspense>
  </Layout>
);

export default App;
