import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IdeaInjection } from './models';
import { OverlayRef } from '@angular/cdk/overlay';
import { EditIdeaComponent } from './edit-idea.component';
import { ModalService, INJECTION_TOKENS } from 'src/app/services/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class EditIdeaService {

  /**
   * emit after an idea has been collected in storage.
   */
  ideaHasBeenCollected: Subject<void> = new Subject();

  constructor(
    private modalService: ModalService,
  ) { }

  openIdeaModal(ideaData: IdeaInjection): OverlayRef {
    const modal = this.modalService.openModal<EditIdeaComponent, IdeaInjection>(
      EditIdeaComponent,
      INJECTION_TOKENS.IDEA,
      {
        type: ideaData.type,
        idea: ideaData.idea
      }
    );
    modal.backdropClick().subscribe(_ => {
      modal.dispose();
    });
    return modal;
  }
}
