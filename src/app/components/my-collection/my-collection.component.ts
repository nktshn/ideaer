import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Idea, IdeaInjection } from '../edit-idea/models';
import { Subscription, merge } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { EditIdeaService } from '../edit-idea/edit-idea.service';
import { MyCollectionService } from './my-collection.service';
import { ModalService, INJECTION_TOKENS } from 'src/app/services/modal/modal.service';
import { EditIdeaComponent } from '../edit-idea/edit-idea.component';
import { concat } from 'rxjs/internal/operators/concat';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  myIdeasList: Idea[] = [];

  constructor(
    private storageService: LocalStorageService,
    private editIdeaService: EditIdeaService,
    public ls: LocalizationService,
    private myCollectionService: MyCollectionService,
  ) { }

  async ngOnInit() {
    this.myIdeasList = await this.loadCollection();

    this.handleSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadCollection(): Promise<Idea[]> {
    return new Promise((resolve, reject) => {
      const collection = this.storageService.useCollection<Idea>('ideas');
      const ideas = collection.getData();
      resolve(ideas);
    });
  }

  private handleSubscriptions() {
    this.subscriptions.push(

      this.editIdeaService.ideaHasBeenCollected.subscribe(async _ => {
        this.myIdeasList = await this.loadCollection();
      }),

      this.editIdeaService.ideaHasBeenRemoved.subscribe(async _ => {
        this.myIdeasList = await this.loadCollection();
      }),

      this.editIdeaService.ideaHasBeenEdited.subscribe(async _ => {
        this.myIdeasList = await this.loadCollection();
      }),

      this.myCollectionService.ideaRemoving.subscribe(this.removeIdea.bind(this)),

      this.myCollectionService.ideaCollecting.subscribe(this.collectIdea.bind(this)),

      this.myCollectionService.ideaEditing.subscribe(this.editIdea.bind(this)),

    );
  }

  private removeIdea(ideaToRemove: Idea) {
    const collection = this.storageService.useCollection<Idea>('ideas');
    const itemToRemoveIndex = collection.getData().findIndex(idea => idea.title === ideaToRemove.title)
    collection.remove(itemToRemoveIndex);
    this.editIdeaService.ideaHasBeenRemoved.next();
  }

  private editIdea(ideaToUpdate: Idea) {
    const collection = this.storageService.useCollection<Idea>('ideas');
    const itemToRemoveIndex = collection.getData().findIndex(idea => idea.title === ideaToUpdate.title)
    collection.update(itemToRemoveIndex, ideaToUpdate);
    this.editIdeaService.ideaHasBeenEdited.next();
  }

  private collectIdea(idea: Idea): void {
    const collection = this.storageService.useCollection<Idea>('ideas');
    collection.add(idea);
    this.editIdeaService.ideaHasBeenCollected.next();
  }

}
