export class Period {
    from: Date | null;
    to: Date | null;

    constructor() {
        this.from = null;
        this.to = null;
    }

    static createFromString(from: string, to: string): Period {
        const period = new Period();
        period.from = new Date(from);
        period.to = new Date(to);
        return period;
    }
}
