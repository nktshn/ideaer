import { Component, OnInit, Input } from '@angular/core';
import { Idea } from '../edit-idea/models';
import { EditIdeaService } from '../edit-idea/edit-idea.service';
import { Subscription } from 'rxjs';
import { MyCollectionService } from '../my-collection/my-collection.service';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-my-ideas-list',
  templateUrl: './my-ideas-list.component.html',
  styleUrls: ['./my-ideas-list.component.scss']
})
export class MyIdeasListComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private editIdeaModal: OverlayRef;

  @Input() myIdeasList: Idea[] = [];

  constructor(
    private myCollectionService: MyCollectionService,
    private editIdeaService: EditIdeaService,
  ) { }

  async ngOnInit() {
    this.subscriptions.push(
      this.editIdeaService.ideaHasBeenEdited.subscribe(_ => {
        this.editIdeaModal.dispose();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onRemoveIdea(idea: Idea) {
    this.myCollectionService.ideaRemoving.next(idea);
  }

  onClickOnIdea(ideaToEdit: Idea): void {
    this.editIdeaModal = this.editIdeaService.openIdeaModal({
      type: 'edit',
      idea: ideaToEdit
    });
  }

}
