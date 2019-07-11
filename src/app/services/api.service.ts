import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  get<T>(url: string, params?: { [index: string]: string | number | boolean }): Observable<T> {
    return this.http.get<T>(url, {
      params: this.getHttpParams(params),
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private getHttpParams(params: { [index: string]: string | number | boolean }): HttpParams {
    const httpParams: HttpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams.set(key, JSON.stringify(params[key]));
      }
    }
    return httpParams;
  }
}
