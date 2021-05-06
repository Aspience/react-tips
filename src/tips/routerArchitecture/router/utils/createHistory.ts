import { createBrowserHistory, History as HistoryType } from 'history';

export class History {
    private readonly history: HistoryType;

    constructor() {
        this.history = createBrowserHistory();
    }

    getHistory() {
        return this.history;
    }
}
