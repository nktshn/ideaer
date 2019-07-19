import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Idea } from '../edit-idea/models';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { EditIdeaService } from '../edit-idea/edit-idea.service';

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
  ) { }

  async ngOnInit() {
    this.myIdeasList = await this.loadCollection();

    this.subscriptions.push(
      this.editIdeaService.ideaHasBeenCollected.subscribe(async _ => {
        this.myIdeasList = await this.loadCollection();
      })
    );
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

}
