import { TestResult, TestResultImpl, NoTestResult } from "../testresult";
import { TestCase } from "../testcase";

class TestResultTest extends TestCase {
    public result: TestResult = new NoTestResult();

    public setUp(): void {
        this.result = new TestResultImpl();
    }

    public tearDown(): void {
        // do nothing
    }

    public testSuccessfulResult(): void {
        this.result.testStarted();
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
        this.result.testStarted();
        this.result.testFailed('testName', new Error('Error msg'));
        this.assertFalse(this.result.isSuccess());
    }
    
    public testSuccessfulSummaryForOneTest(): void {
        this.result.testStarted();
        this.assertEqual('1 run, 0 failed', this.result.summary());
    }
    
    public testSuccessfulSummaryForTwoTests(): void {
        this.result.testStarted();
        this.result.testStarted();
        this.assertEqual('2 run, 0 failed', this.result.summary());
    }
    
    public testSetName(): void {
        this.result.setName('MyName');
        this.assertEqual('MyName: 0 run, 0 failed', this.result.summary());
    }
    
    public testUnsuccessfulSummary(): void {
        let error = new Error("Failed!");
        let error2 = new Error("And failed again!");

        this.result.testStarted();
        this.result.testStarted();
        this.result.testStarted();
        this.result.testFailed('testSupposedToFail', error);
        this.result.testFailed('evenThisSupposedToFail', error2);

        let expectedSummary =
            '3 run, 2 failed:\n' +
            '\n' +
            '- testSupposedToFail\n' +
            error.stack + '\n' +
            '\n' +
            '- evenThisSupposedToFail\n' +
            error2.stack + '\n' +
            '\n';
        this.assertEqual(expectedSummary, this.result.summary());
    }
}

new TestResultTest('').runAllAndLog(console);