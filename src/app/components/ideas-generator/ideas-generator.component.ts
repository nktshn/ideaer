import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { BoredService } from 'src/app/services/boredapi/bored.service';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-ideas-generator',
  templateUrl: './ideas-generator.component.html',
  styleUrls: ['./ideas-generator.component.scss']
})
export class IdeasGeneratorComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  disabled: boolean;
  fetchedIdea: string = '...';

  constructor(
    public ls: LocalizationService,
    private boredapi: BoredService,
  ) { }

  ngOnInit() {
    this.onFetchIdea();
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onFetchIdea() {
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
    )
  }

}
