export interface TestResult {
    testStarted(testName: string): void;
    testFailed(testName: string, error: any): void;
    isSuccess(): boolean;
    summary(): string;
}


export class TestResultImpl implements TestResult {
    private testClassName: string = '';
    private testReportOrder: string[];
    private testInfos: Map<string, any>;

    constructor(testClassName: string, testReportOrder: string[]) {
        if (!testClassName) throw new Error("Can't create TestResult with empty test class name!");
        if (testReportOrder.includes('')) throw new Error('Report order must contain valid method names - it cannot contain empty strings!');
        this.testClassName = testClassName;
        this.testReportOrder = testReportOrder;
        this.testInfos = new Map<string, any>();
    }
    
    private get runCount(): number {
        return this.testInfos.size;
    }

    private get failedCount(): number {
        let count = 0;
        for (let value of this.testInfos.values()) {
            if (value !== null) count++;
        }
        return count;
    }

    public testStarted(testName: string): void {
        if (this.testInfos.has(testName)) throw new Error(`Test method "${testName}" already started!`);
        this.testInfos.set(testName, null);
    }
    
    public testFailed(testName: string, error: any): void {
        if (!this.testInfos.has(testName)) throw new Error(`Test method "${testName}" failed but never started!`);
        this.testInfos.set(testName, error);
    }

    public isSuccess(): boolean {
        if (this.failedCount > this.runCount) throw new Error("Failed tests cannot be more than run tests!");
        return this.failedCount === 0;
    }
    
    public summary(): string {
        if (!this.allTestsRan()) throw new Error('Not all tests ran!');
        if (!this.allTestsWereExpected()) throw new Error('Ran more tests than those in report order array!');
        let summary = this.testClassName + ': ' + this.runCount.toString() + " run, " + this.failedCount.toString() + " failed";
        if (this.isSuccess()) return summary;

        return summary + ":\n\n" + this.failedMethodsSummary();
    }

    private allTestsRan(): boolean {
        return this.testReportOrder.every(t => this.testInfos.has(t));   
    }

    private allTestsWereExpected(): boolean {
        let ranTests = Array.from(this.testInfos.keys());
        return ranTests.every(t => this.testReportOrder.includes(t));
    }

    private failedMethodsSummary(): string {
        return this.testReportOrder.map(t => this.infosFor(t)).reduce(this.concat);
    }

    private infosFor(testName: string): string {
        if (this.testInfos.has(testName) && (this.testInfos.get(testName) !== null)) return this.formatFailedErrorSummary(testName);
        return '';
    }

    private formatFailedErrorSummary(testName: string): string {
        let summary = '- ' + testName + '\n';
        summary += this.testInfos.get(testName).stack + '\n\n';
        return summary;
    }

    private concat(previous: string, current: string): string {
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