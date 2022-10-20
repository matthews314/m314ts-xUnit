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
        try {
            callable();
            this.fail();
        } catch (error) {
            if ((<Object> error).constructor.name !== M314UsageError.name) throw error;
            let e = <M314UsageError> error;
            this.assertEqual(e.message, "Method not implemented.");
        }
    }
}
