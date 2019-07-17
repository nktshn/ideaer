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
    this.fetchedIdea = '...';
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

  onFetchIdea(): void {
    this.fetchedIdea = '...';
    this.disabled = true;
    this.subscriptions.push(
      this.boredapi.fetchIdea().pipe(
        // do request again if the fetched idea is the same
        takeWhile((idea => {
          return idea.activity !== this.fetchedIdea;
        }))
      ).subscribe(idea => {
        this.fetchedIdea = idea.activity;
      }, (err => {
        this.fetchedIdea = `${this.ls.getMessage('somethingWentWrong')} :(`;
      }), () => {
        this.disabled = false;
      })
    );
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
