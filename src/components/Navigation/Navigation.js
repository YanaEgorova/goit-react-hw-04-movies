import React from 'react';
import {
  NavLink
} from 'react-router-dom';
import routes from '../../routes';
import './Navigation.css';

const Navigation = () => ( <
  ul className = "Navigation" >
  <
  li className = "Navigation-item" >
  <
  NavLink className = "link"
  activeClassName = "active-link"
  exact to = {
    routes.home
  } >
  Home {
    ' '
  } <
  /NavLink>{' '} < /
  li > {
    ' '
  } <
  li className = "Navigation-item" >
  <
  NavLink className = "link"
  activeClassName = "active-link"
  to = {
    routes.movies
  } >
  Movies {
    ' '
  } <
  /NavLink>{' '} < /
  li > {
    ' '
  } <
  /ul>
);

export default Navigation;