import { Component, OnInit } from '@angular/core';
import { Idea } from '../edit-idea/models';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { EditIdeaService } from '../edit-idea/edit-idea.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-ideas-list',
  templateUrl: './my-ideas-list.component.html',
  styleUrls: ['./my-ideas-list.component.scss']
})
export class MyIdeasListComponent implements OnInit {

  myIdeasList: Idea[];

  private subscriptions: Subscription[] = [];

  constructor(
    private storageService: LocalStorageService,
    private editIdeaService: EditIdeaService,
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
