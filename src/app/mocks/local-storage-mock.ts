export class LocalStorageMock {
    store: any;
    length;
    key;
    constructor() {
        this.store = {};
    }
    getItem(key: string): string {
        return this.store[key] || null;
    }
    setItem(key: string, value: string): void {
        this.store[key] = `${value}`;
    }
    removeItem(key: string): void {
        delete this.store[key];
    }
    clear(): void {
        this.store = {};
    }
}
