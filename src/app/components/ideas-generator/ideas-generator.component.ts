import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-ideas-generator',
  templateUrl: './ideas-generator.component.html',
  styleUrls: ['./ideas-generator.component.scss']
})
export class IdeasGeneratorComponent implements OnInit {

  constructor(
    public ls: LocalizationService,
  ) { }

  ngOnInit() {
  }

}
