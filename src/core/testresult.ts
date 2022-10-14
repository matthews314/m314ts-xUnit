export interface TestResult {
    testStarted(): void;
    testFailed(testName: string, error: any): void;
    isSuccess(): boolean;
    summary(): string;
}


export class TestResultImpl implements TestResult {
    private testClassName: string = '';
    private runCount: number = 0;
    private testReportOrder: string[];
    private failedTestInfos: Map<string, any>;

    constructor(testClassName: string, testReportOrder: string[]) {
        if (!testClassName) throw new Error("Can't create TestResult with empty test class name!");
        this.testClassName = testClassName;
        this.testReportOrder = testReportOrder;
        this.failedTestInfos = new Map<string, any>();
    }
    
    private get failedCount(): number {
        return this.failedTestInfos.size;
    }

    public testStarted(): void {
        this.runCount++;
    }
    
    public testFailed(testName: string, error: any): void {
        this.failedTestInfos.set(testName, error);
    }

    public isSuccess(): boolean {
        if (this.failedCount > this.runCount) throw new Error("Failed tests cannot be more than run tests!");
        return this.failedCount === 0;
    }
    
    public summary(): string {
        let summary = this.testClassName + ': ' + this.runCount.toString() + " run, " + this.failedCount.toString() + " failed";
        if (this.isSuccess()) return summary;

        return summary + ":\n\n" + this.failedMethodsSummary();
    }

    private failedMethodsSummary() {
        return this.testReportOrder.map(t => this.infosFor(t)).reduce(this.concat)
    }

    private infosFor(testName: string): string {
        if (testName && this.failedTestInfos.has(testName)) return this.formatFailedErrorSummary(testName);
        return '';
    }

    private formatFailedErrorSummary(testName: string) {
        let summary = '- ' + testName + '\n';
        summary += this.failedTestInfos.get(testName).stack + '\n\n';
        return summary;
    }

    private concat(previous: string, current: string) {
        if (previous) return previous + current;
        else return current;
    }
}


export class NoTestResult implements TestResult {
    setName(name: string): void {
        throw new Error("Method not implemented.");
    }
    testStarted(): void {
        throw new Error("Method not implemented.");
    }
    testFailed(): void {
        throw new Error("Method not implemented.");
    }
    summary(): string {
        throw new Error("Method not implemented.");
    }
    isSuccess(): boolean {
        throw new Error("Method not implemented.");
    }
}