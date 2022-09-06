export interface TestResult {
    setName(name: string): void;
    testStarted(): void;
    testFailed(testName: string, error: any): void;
    isSuccess(): boolean;
    summary(): string;
}


export class TestResultImpl implements TestResult {
    private name: string = '';
    private runCount: number = 0;
    private errorCount: number = 0;
    private failedTestNames: string[] = [];
    private errors: any[] = [];

    public setName(name: string): void {
        this.name = name;
    }

    public testStarted(): void {
        this.runCount++;
    }

    public testFailed(testName: string, error: any): void {
        this.errorCount++;
        this.failedTestNames.push(testName);
        this.errors.push(error);
    }

    public isSuccess(): boolean {
        if (this.errorCount > this.runCount) throw new Error("Failed tests cannot be more than run tests!");
        return this.errorCount === 0;
    }

    public summary(): string {
        let summary = '';
        if (this.name !== '') {
            summary += this.name + ': ';
        }
        summary += this.runCount.toString() + " run, " + this.errorCount.toString() + " failed";

        if (this.isSuccess()) return summary;
        else {
            summary += ":\n\n";
            for (let i = 0; i < this.failedTestNames.length; i++) {
                let testName = this.failedTestNames[i];
                let error = this.errors[i];
                summary += '- ' + testName + '\n';
                summary += error.stack + '\n';
                summary += '\n';
            }
            return summary;
        }
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