import { AlbumState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess, deleteAlbumFailure, deleteAlbumRequest,
  deleteAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess
} from './album.actions';

export const initialState: AlbumState = {
  albums: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null
};

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchLoading: true})),
  on(fetchAlbumsSuccess, (state, {albums}) => ({...state, fetchLoading: false, albums})),
  on(fetchAlbumsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createAlbumRequest, state => ({...state, createLoading: true})),
  on(createAlbumSuccess, state => ({...state, createLoading: false})),
  on(createAlbumFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),

  on(deleteAlbumRequest, state => ({...state, createLoading: true})),
  on(deleteAlbumSuccess, state => ({...state, createLoading: false})),
  on(deleteAlbumFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),
)

