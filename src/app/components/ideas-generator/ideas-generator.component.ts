import { Component, OnInit, ComponentRef } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { BoredService } from 'src/app/services/boredapi/bored.service';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ModalService, INJECTION_TOKENS } from 'src/app/services/modal/modal.service';
import { EditIdeaComponent } from '../edit-idea/edit-idea.component';
import { Idea } from '../edit-idea/models';
import { EditIdeaService } from '../edit-idea/edit-idea.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { BoredApiActivity } from 'src/app/services/boredapi/models';

@Component({
  selector: 'app-ideas-generator',
  templateUrl: './ideas-generator.component.html',
  styleUrls: ['./ideas-generator.component.scss']
})
export class IdeasGeneratorComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  disabled: boolean;
  fetchedIdea: string;
  modal: OverlayRef;

  constructor(
    public ls: LocalizationService,
    private boredapi: BoredService,
    private modalService: ModalService,
    private editIdeaService: EditIdeaService,
  ) { }

  ngOnInit(): void {
    this.onFetchIdea();

    this.subscriptions.push(
      this.editIdeaService.ideaHasBeenCollected.subscribe(_ => {
        this.modal.dispose();
        this.onFetchIdea();
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
    this.modal = this.modalService.openModal<EditIdeaComponent, Partial<Idea>>(
      EditIdeaComponent,
      INJECTION_TOKENS.IDEA,
      {
        title: this.fetchedIdea,
      }
    );
    this.subscriptions.push(
      this.modal.backdropClick().subscribe(_ => {
        this.modal.dispose();
      })
    );
  }

}
