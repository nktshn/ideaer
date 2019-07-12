import { Injectable, OnInit } from '@angular/core';
import { LOCALIZATION_DATA, SupportedLocalization } from './localization-data';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(
    private lss: LocalStorageService,
  ) {
    this.changeLocalization(this.getLocalizationFromLocalStorage());
  }

  public readonly supportedLocalizations: SupportedLocalization[] = ['en', 'ru'];

  private currentLocalization: SupportedLocalization = 'en';

  getMessage(messageName: string): string {
    if (!LOCALIZATION_DATA[messageName]) {
      throw new Error('LocalizationService getMessage(): no such message exists');
    }

    return LOCALIZATION_DATA[messageName][this.currentLocalization];
  }

  changeLocalization(lang: SupportedLocalization = 'en'): void {
    const isLocalizationSupported = this.supportedLocalizations.includes(lang);
    const localizationToSet = isLocalizationSupported ? lang : this.supportedLocalizations[0];
    this.currentLocalization = localizationToSet;
    this.setLocalizationToLocalStorage();
  }

  getCurrentLocalization(): SupportedLocalization {
    return this.currentLocalization;
  }

  private setLocalizationToLocalStorage(): void {
    const collection = this.lss.useCollection<SupportedLocalization[1]>(this.lss.Collections.localization);
    collection.update(0, this.currentLocalization);
  }

  private getLocalizationFromLocalStorage(): SupportedLocalization {
    const collection = this.lss.useCollection<SupportedLocalization>(this.lss.Collections.localization);
    return collection.getData()[0];
  }

}


