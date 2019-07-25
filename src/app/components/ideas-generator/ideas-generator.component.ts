import { Component, OnInit, ComponentRef } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { BoredService } from 'src/app/services/boredapi/bored.service';
import { Subscription } from 'rxjs';
import { Idea } from '../edit-idea/models';
import { EditIdeaService } from '../edit-idea/edit-idea.service';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-ideas-generator',
  templateUrl: './ideas-generator.component.html',
  styleUrls: ['./ideas-generator.component.scss']
})
export class IdeasGeneratorComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private collectIdeaModal: OverlayRef;

  disabled: boolean;
  fetchedIdea: string;

  constructor(
    public ls: LocalizationService,
    private boredapi: BoredService,
    private editIdeaService: EditIdeaService,
  ) { }

  ngOnInit(): void {
    this.onFetchIdea();

    this.subscriptions.push(
      this.editIdeaService.ideaHasBeenCollected.subscribe(_ => {
        this.onFetchIdea();
        this.collectIdeaModal.dispose();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async onFetchIdea(): Promise<void> {
    this.fetchedIdea = '...';
    this.disabled = true;
    this.fetchedIdea = await this.boredapi.fetchIdea(this.fetchedIdea, null);
    this.disabled = false;
  }

  onCollectIdea(): void {
    this.collectIdeaModal = this.editIdeaService.openIdeaModal({
      type: 'collect',
      idea: new Idea({
        title: this.fetchedIdea
      })
    });
  }

}
