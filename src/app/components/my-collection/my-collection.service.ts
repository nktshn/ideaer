import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Idea } from '../edit-idea/models';
import { ModalService } from 'src/app/services/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class MyCollectionService {

  ideaRemoving = new Subject<Idea>();
  ideaEditing = new Subject<Idea>();
  ideaCollecting = new Subject<Idea>();

  constructor(
    private modalService: ModalService,
  ) { }




}
