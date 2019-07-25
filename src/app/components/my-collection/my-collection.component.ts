import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Idea } from '../edit-idea/models';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { EditIdeaService } from '../edit-idea/edit-idea.service';
import { MyCollectionService } from './my-collection.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { LocalStorageModule } from 'src/app/services/local-storage/local-storage-module';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private createIdeaModal: OverlayRef;
  private ideaStorageCollection: LocalStorageModule.Collection<Idea>;

  myIdeasList: Idea[] = [];

  constructor(
    private storageService: LocalStorageService,
    private editIdeaService: EditIdeaService,
    public ls: LocalizationService,
    private myCollectionService: MyCollectionService,
  ) { }

  async ngOnInit() {
    this.myIdeasList = await this.loadCollection();
    this.ideaStorageCollection = this.storageService.useCollection<Idea>('ideas');

    this.handleSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onCreateIdea() {
    this.createIdeaModal = this.editIdeaService.openIdeaModal({
      type: 'create',
      idea: new Idea({})
    })
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

      this.editIdeaService.ideaHasBeenCreated.subscribe(async _ => {
        this.createIdeaModal.dispose();
        this.myIdeasList = await this.loadCollection();
      }),

      this.myCollectionService.ideaRemoving.subscribe(this.removeIdea.bind(this)),
      this.myCollectionService.ideaCollecting.subscribe(this.collectIdea.bind(this)),
      this.myCollectionService.ideaEditing.subscribe(this.editIdea.bind(this)),
      this.myCollectionService.ideaCreating.subscribe(this.createIdea.bind(this)),

    );
  }

  private removeIdea(ideaToRemove: Idea) {
    const itemToRemoveIndex = this.ideaStorageCollection.getData().findIndex(idea => idea.title === ideaToRemove.title)
    this.ideaStorageCollection.remove(itemToRemoveIndex);
    this.editIdeaService.ideaHasBeenRemoved.next();
  }

  private editIdea(ideaToUpdate: Idea) {
    const itemToEditIndex = this.ideaStorageCollection.getData().findIndex(idea => idea.title === ideaToUpdate.title)
    this.ideaStorageCollection.update(itemToEditIndex, ideaToUpdate);
    this.editIdeaService.ideaHasBeenEdited.next();
  }

  private collectIdea(idea: Idea): void {
    this.ideaStorageCollection.add(idea);
    this.editIdeaService.ideaHasBeenCollected.next();
  }

  private createIdea(idea: Idea): void {
    this.ideaStorageCollection.add(idea);
    this.editIdeaService.ideaHasBeenCreated.next();
  }

}
