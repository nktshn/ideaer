import { Injectable } from '@angular/core';
import { BoredApiActivity } from './models';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

/**
 * Service to work with http://www.boredapi.com/
 */
@Injectable({
  providedIn: 'root'
})
export class BoredService {

  private readonly API_URL = 'https://www.boredapi.com/api/activity'

  constructor(
    private api: ApiService,
  ) { }

  fetchIdea(params?): Observable<BoredApiActivity> {
    return this.api.get<BoredApiActivity>(this.API_URL, params);
  }
}
