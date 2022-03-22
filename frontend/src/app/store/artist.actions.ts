import { createAction, props } from '@ngrx/store';
import { Artist, ArtistData } from '../models/artist.model';


export const fetchArtistRequest = createAction('[Artist] Fetch Request');
export const fetchArtistSuccess = createAction(
  '[Artist] Fetch Success',
  props<{artists: Artist[]}>()
);
export const fetchArtistFailure = createAction(
  '[Artist] Fetch Failure',
  props<{error: string}>()
);

export const createArtistRequest = createAction(
  '[Artists] Create Request',
  props<{artistData: ArtistData}>()
);
export const createArtistSuccess = createAction(
  '[Artists] Create Success'
);
export const createArtistFailure = createAction(
  '[Artists] Create Failure',
  props<{error: string}>()
);

export const deleteArtistRequest = createAction(
  '[Artists] Delete Request',
  props<{id: string}>()
);
export const deleteArtistSuccess = createAction(
  '[Artists] Delete Success',
  props<{artists: Artist[]}>()
);
export const deleteArtistFailure = createAction(
  '[Artists] Delete Failure',
  props<{error: string}>()
);

export const publishArtistRequest = createAction(
  '[Artists] Publish Request',
  props<{id: string}>()
);
export const publishArtistSuccess = createAction(
  '[Artists] Publish Success',
  props<{artists: Artist[]}>()
);
export const publishArtistFailure = createAction(
  '[Artists] Publish Failure',
  props<{error: string}>()
);


