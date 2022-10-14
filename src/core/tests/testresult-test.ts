import { TestResult, TestResultImpl, NoTestResult } from "../testresult";
import { TestCase } from "../testcase";

export class TestResultTest extends TestCase {
    public result: TestResult = new NoTestResult();

    public setUp(): void {
        let testReportOrder = [
            'randomTestName_1',
            'testSupposedToFail_1',
            'randomTestName_2',
            'testSupposedToFail_2',
            'randomTestName_3'
        ];
        this.result = new TestResultImpl('TestName', testReportOrder);
    }

    public tearDown(): void {
        // do nothing
    }

    public testSuccessfulResult(): void {
        this.testStarted(1);
        this.assertTrue(this.result.isSuccess());
    }

    public testIsSuccessFailsIfFailedTestsOutnumberRunTests(): void {
        try {
            this.result.testFailed('testName', new Error('Error msg'));
            this.result.isSuccess();
            this.fail();
        } catch (error) {
            let e = <Error> error;
            this.assertEqual(e.message, "Failed tests cannot be more than run tests!");
        }
    }

    public testSummaryFailsIfFailedTestsOutnumberRunTests(): void {
        try {
            this.result.testFailed('testName', new Error('Error msg'));
            this.result.summary();
            this.fail();
        } catch (error) {
            let e = <Error> error;
            this.assertEqual(e.message, "Failed tests cannot be more than run tests!");
        }
    }

    public testUnsuccessfulResult(): void {
        this.testStarted(1);
        this.result.testFailed('testName', new Error('Error msg'));
        this.assertFalse(this.result.isSuccess());
    }
    
    public testSuccessfulSummaryForOneTest(): void {
        this.testStarted(1);
        this.assertEqual('TestName: 1 run, 0 failed', this.result.summary());
    }
    
    public testSuccessfulSummaryForTwoTests(): void {
        this.testStarted(2);
        this.assertEqual('TestName: 2 run, 0 failed', this.result.summary());
    }
        
    public testUnsuccessfulSummary(): void {
        let error1 = new Error("Failed!");
        let error2 = new Error("And failed again!");

        this.testStarted(3);
        this.result.testFailed('testSupposedToFail_2', error2);
        this.result.testFailed('testSupposedToFail_1', error1);

        let expectedSummary =
            'TestName: 3 run, 2 failed:\n' +
            '\n' +
            '- testSupposedToFail_1\n' +
            error1.stack + '\n' +
            '\n' +
            '- testSupposedToFail_2\n' +
            error2.stack + '\n' +
            '\n';
        this.assertEqual(expectedSummary, this.result.summary());
    }

    private testStarted(times: number) {
        for (let i = 0; i < times; ++i) this.result.testStarted();
    }
}
