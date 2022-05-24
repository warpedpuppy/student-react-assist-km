import { func } from "prop-types";

//action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_FAVORITES = 'SET_FAVORITES';

// action creators
export function setMovies(value) {
  return { 
    type: SET_MOVIES, 
    value 
  };
}

export function setFilter(value) {
  return { 
    type: SET_FILTER, 
    value 
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  };
}

export function updateUser(value) {
  return {
    type: UPDATE_USER,
    value
  };
}

export function setFavorites(value) {
  return {
    type: SET_FAVORITES,
    value
  };
}