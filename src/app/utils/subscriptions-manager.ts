interface Sub { unsubscribe: () => any; }

export class SubscriptionsManager {
    constructor() {
    }

    private subs: Sub[] = [];

    add(sub: Sub): void {
        this.subs.push(sub);
    }
    unsubscribe(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }
    clear(): void {
        this.subs = [];
    }
}
