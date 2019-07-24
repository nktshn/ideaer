import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Idea, IdeaInjection } from '../edit-idea/models';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { EditIdeaService } from '../edit-idea/edit-idea.service';
import { MyCollectionService } from './my-collection.service';
import { ModalService, INJECTION_TOKENS } from 'src/app/services/modal/modal.service';
import { EditIdeaComponent } from '../edit-idea/edit-idea.component';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit {

  myIdeasList: Idea[];

  private subscriptions: Subscription[] = [];

  constructor(
    private storageService: LocalStorageService,
    private editIdeaService: EditIdeaService,
    public ls: LocalizationService,
    private myCollectionService: MyCollectionService,
    private modalService: ModalService,
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

      this.myCollectionService.ideaRemoving.subscribe(this.removeIdea.bind(this)),

      this.myCollectionService.ideaCollecting.subscribe(this.collectIdea.bind(this))

    );
  }

  private async removeIdea(ideaToRemove: Idea) {
    const collection = this.storageService.useCollection<Idea>('ideas');
    const itemToRemoveIndex = collection.getData().findIndex(idea => idea.title === ideaToRemove.title)
    collection.remove(itemToRemoveIndex);
    this.myIdeasList = await this.loadCollection();
  }

  private editIdea(idea: Idea): void {

  }

  private collectIdea(idea: Idea): void {
    const collection = this.storageService.useCollection<Idea>('ideas');
    collection.add(idea);
    this.editIdeaService.ideaHasBeenCollected.next();
  }

}
