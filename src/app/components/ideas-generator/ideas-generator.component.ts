import { Component, OnInit, ComponentRef } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { BoredService } from 'src/app/services/boredapi/bored.service';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ModalService } from 'src/app/services/modal/modal.service';
import { EditIdeaComponent } from '../edit-idea/edit-idea.component';

@Component({
  selector: 'app-ideas-generator',
  templateUrl: './ideas-generator.component.html',
  styleUrls: ['./ideas-generator.component.scss']
})
export class IdeasGeneratorComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  disabled: boolean;
  fetchedIdea = '...';

  constructor(
    public ls: LocalizationService,
    private boredapi: BoredService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.onFetchIdea();
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
    const modal = this.modalService.openModal<EditIdeaComponent, any>(EditIdeaComponent);
    modal.backdropClick().subscribe(_ => {
      modal.dispose();
    });
  }

}
