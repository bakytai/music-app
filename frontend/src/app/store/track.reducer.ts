import { TrackState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  fetchTrackFailure,
  fetchTrackRequest,
  fetchTrackSuccess
} from './track.actions';

export const initialState: TrackState = {
  tracks: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null
};

export const tracksReducer = createReducer(
  initialState,
  on(fetchTrackRequest, state => ({...state, fetchLoading: true})),
  on(fetchTrackSuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks})),
  on(fetchTrackFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createTrackRequest, state => ({...state, createLoading: true})),
  on(createTrackSuccess, state => ({...state, createLoading: false})),
  on(createTrackFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),
)
