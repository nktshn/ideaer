import { Component, OnInit } from '@angular/core';
import { SupportedLocalization } from 'src/app/services/localization/localization-data';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {

  readonly supportedLocalizations: SupportedLocalization[];
  currentLocalization: SupportedLocalization;

  constructor(
    public ls: LocalizationService,
  ) {
    this.supportedLocalizations = this.ls.supportedLocalizations;
  }

  ngOnInit() {
    this.currentLocalization = this.ls.getCurrentLocalization();
  }

  onChangeLocalization(lang: SupportedLocalization) {
    this.ls.changeLocalization(lang);
  }

}
