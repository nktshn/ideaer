import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss']
})
export class EditIdeaComponent implements OnInit {

  constructor(
    public ls: LocalizationService,
  ) { }

  ngOnInit(): void {
  }

}
