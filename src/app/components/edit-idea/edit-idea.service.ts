import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditIdeaService {

  /**
   * emit after an idea has been collected in storage.
   */
  ideaCollecting: Subject<void> = new Subject();

  constructor() { }
}
