import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandicapResponse } from '../models/handicap-response.model';

@Injectable({
  providedIn: 'root'
})
export class HandicapService {

  url = 'https://vana-handicap-walter-tondu.azurewebsites.net/api/httptrigger2';
  constructor(private http: HttpClient) { }

  public getHandicap(name: string, scores: string): Observable<HandicapResponse> {
    const requestData = {
      name,
      scores
    };
    return this.http.post<HandicapResponse>(this.url, requestData);
  }
}
