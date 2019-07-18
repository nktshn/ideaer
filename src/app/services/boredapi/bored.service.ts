import { Injectable } from '@angular/core';
import { BoredApiActivity } from './models';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { takeWhile } from 'rxjs/operators';
import { LocalizationService } from '../localization/localization.service';

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
    public ls: LocalizationService,
  ) { }

  fetchIdea(currentIdea: string, params?): Promise<string> {
    return new Promise((resolve, reject) => {
      const fetchIdeaSub = this.api.get<BoredApiActivity>(this.API_URL, params)
        .pipe(
          // do request again if the fetched idea is the same
          takeWhile((idea => {
            return idea.activity !== currentIdea;
          }))
        ).subscribe(idea => {
          resolve(idea.activity)
        }, (err => {
          reject(`${this.ls.getMessage('somethingWentWrong')} :(`);
        }), () => {
          fetchIdeaSub.unsubscribe();
        })
    })
  }
}
