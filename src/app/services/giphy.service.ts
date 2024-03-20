import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  apiKey = 'cqnwJ1w64lyahikJV3Zl4gxZQcpKm7sH';
  trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}`;
  searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  getTrendingGifs(): Observable<any> {
    return this.http.get<any>(this.trendingUrl);
  }

  searchGifs(query: string): Observable<any> {
    const url = `${this.searchUrl}&q=${query}`;
    return this.http.get<any>(url);
  }
}
