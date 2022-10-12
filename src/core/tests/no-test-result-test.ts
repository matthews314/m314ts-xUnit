import { TestResult, NoTestResult } from "../testresult";
import { TestCase } from "../testcase";

class NoTestResultTest extends TestCase {
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
        this._testError(() => this.result.testStarted());
        this._testError(() => this.result.testFailed('testName', new Error('Error message!')));
    }

    private _testError(callable: any) {
        try {
            callable();
            this.fail();
        } catch (error) {
            let e = <Error> error;
            this.assertEqual(e.message, "Method not implemented.");
        }
    }
}

new NoTestResultTest('').runAllAndLog(console);