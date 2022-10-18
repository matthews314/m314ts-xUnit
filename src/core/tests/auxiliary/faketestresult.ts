import { TestResult } from "../../testresult";

export class FakeTestResult implements TestResult {
    private _log: string = '';

    testStarted(testName: string): void {
        this._log += testName + ' ';
    }
    testFailed(testName: string, error: any): void {
        // do nothing
    }
    isSuccess(): boolean {
        throw new Error("Method not implemented.");
    }
    summary(): string {
        throw new Error("Method not implemented.");
    }

    public get log(): string {
        return this._log;
    }
    
}