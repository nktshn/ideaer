export namespace LocalStorageModule {
    const storage: Storage = window.localStorage;

    export class Collection<T> {
        private collectionName: string;

        constructor(collectionName: string) {
            this.collectionName = collectionName;
        }

        getData(): T[] {
            return JSON.parse(storage.getItem(this.collectionName)) as T[] || [];
        }

        update(index: number, data: T): T[] {
            const dataToSet: T[] = this.getData();
            dataToSet[index] = data;
            this.set(dataToSet);
            this.normalizeCollection();
            return this.getData();
        }

        add(...data: T[]): T[] {
            const dataToSet: T[] = this.getData();
            dataToSet.push(...data);
            this.set(dataToSet);
            this.normalizeCollection();
            return this.getData();
        }

        remove(index: number): T[] {
            const dataToSet: T[] = this.getData();
            dataToSet[index] = null;
            this.set(dataToSet);
            this.normalizeCollection();
            return this.getData();
        }

        private set(data: T[]): void {
            storage.setItem(this.collectionName, JSON.stringify(data));
        }

        private normalizeCollection(): T[] {
            const data: T[] = this.getData();
            const dataToSet = data.filter(Boolean);
            this.set(dataToSet);
            return this.getData();
        }
    }
}
