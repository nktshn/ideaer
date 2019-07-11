import { Injectable } from '@angular/core';
import { LOCALIZATION_DATA, SupportedLocalization } from './localization-data';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor() { }

  public readonly supportedLocalizations: SupportedLocalization[] = ['en', 'ru'];

  private currentLocalization: SupportedLocalization = 'en';

  getMessage(messageName: string): string {
    if (!LOCALIZATION_DATA[messageName]) {
      throw new Error('LocalizationService getMessage(): no such message exists');
    }

    return LOCALIZATION_DATA[messageName][this.currentLocalization];
  }

  changeLocalization(lang: SupportedLocalization = 'en'): void {
    this.currentLocalization = lang;
  }

  getCurrentLocalization(): SupportedLocalization {
    return this.currentLocalization;
  }

}


