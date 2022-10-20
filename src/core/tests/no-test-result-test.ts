import { TestResult, NoTestResult } from "../testresult";
import { TestCase, TestFailedError } from "../testcase";
import { M314UsageError } from "../../util/errors";


export class NoTestResultTest extends TestCase {
    private result: TestResult = new NoTestResult();

    public setUp(): void {
        // do nothing
    }

    public tearDown(): void {
        // do nothing
    }

    public testErrorOnEveryMethod() {
        this._testError(() => this.result.isSuccess());
        this._testError(() => this.result.summary());
        this._testError(() => this.result.testStarted('testName'));
        this._testError(() => this.result.testFailed('testName', new TestFailedError('Error message!')));
    }

    private _testError(callable: any) {
        this.assertThrowsError(callable, M314UsageError.name, "Method not implemented.");
    }
}
