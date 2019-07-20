import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Idea } from '../edit-idea/models';

@Injectable({
  providedIn: 'root'
})
export class MyCollectionService {

  ideaRemoving = new Subject<Idea>();

  constructor() { }
}
