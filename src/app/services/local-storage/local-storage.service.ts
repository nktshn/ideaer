import { Injectable } from '@angular/core';
import { LocalStorageModule } from './local-storage-module';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  useCollection<T>(collectionName: CollectionName): LocalStorageModule.Collection<T> {
    return new LocalStorageModule.Collection<T>(collectionName);
  }

  clearCollection(collectionName: string): void {
    this.storage.removeItem(collectionName);
  }

  getCollectionList(): string[] {
    return Object.keys(this.storage);
  }

}

export type CollectionName =
  'ideas' |
  'localization';