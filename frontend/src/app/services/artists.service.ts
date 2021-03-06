import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiArtistData, Artist, ArtistData } from '../models/artist.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ArtistsService {

  constructor(private http: HttpClient) {
  }

  getArtists() {
    return this.http.get<ApiArtistData[]>(environment.apiUrl + '/artists').pipe(
      map(response => {
        return response.map(artistData => {
          return new Artist(artistData._id, artistData.name, artistData.information, artistData.image, artistData.is_published);
        });
      })
    );
  }

  getPublish(id: string) {
    return this.http.post<ApiArtistData[]>(environment.apiUrl + `/artists/${id}/publish`, {is_publish: true}).pipe(
      map(response => {
        return response.map(artistData => {
          return new Artist(artistData._id, artistData.name, artistData.information, artistData.image, artistData.is_published);
        });
      })
    );
  }

  createArtist(artist: ArtistData) {
    const formData = new FormData();

    Object.keys(artist).forEach(key => {
      if (artist[key] !== null) {
        formData.append(key, artist[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/artists', formData);
  }

  deleteArtist(id: string) {
    return this.http.delete<ApiArtistData[]>(environment.apiUrl + '/artists/' + id).pipe(
      map(response => {
        return response.map(artistData => {
          return new Artist(artistData._id, artistData.name, artistData.information, artistData.image, artistData.is_published);
        });
      })
    );
  }


}
