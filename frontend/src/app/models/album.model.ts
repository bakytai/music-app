import { Artist } from './artist.model';

export class Album {
  constructor(
    public id: string,
    public title: string,
    public year: string,
    public artist: Artist,
    public image: string,
    public is_published: boolean
  ) {}
}

export interface AlbumData {
  [key: string]: any;
  title: string;
  year: string;
  artist: string;
  image: File | null;
}

export interface ApiAlbumData {
  _id: string,
  title: string,
  year: string,
  artist: Artist,
  image: string,
  is_published: boolean
}
