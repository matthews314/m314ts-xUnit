import { TestResult, TestResultImpl, NoTestResult } from "../testresult";
import { TestCase } from "../testcase";
import { M314UsageError } from "../../util/errors";

export class TestResultTest extends TestCase {
    private result: TestResult = new NoTestResult();

    public setUp(): void {
        let testReportOrder = ['t1', 't2', 't3', 't4', 't5'];
        this.result = new TestResultImpl('TestName', testReportOrder);
    }

    public tearDown(): void {
        // do nothing
    }

    public testNoEmptyStringsAcceptedInTestReportOrder(): void {
        this.assertThrowsError(
            () => new TestResultImpl('TestName', ['t1', '']),
            M314UsageError.name,
            'Report order must contain valid method names - it cannot contain empty strings!'
        );
    }

    public testAllTestsInReportOrderMustRun(): void {
        this.assertThrowsError(
            () => { this.runAllTestsButOne(); this.result.summary(); },
            M314UsageError.name,
            'Not all tests ran!'
        );
    }

    public testAllRanTestMustBeInReportOrder(): void {
        this.assertThrowsError(
            () => { this.runAllTestsPlusOne(); this.result.summary(); },
            M314UsageError.name,
            'Ran more tests than those in report order array!'
        )
    }

    public testSuccessfulResult(): void {
        this.runAllTestsSuccessfully();
        this.assertTrue(this.result.isSuccess());
    }

    public testCantRunSameTestTwice(): void {
        this.startSuccessfulTest('t1');
        this.assertThrowsError(() => this.startSuccessfulTest('t1'), M314UsageError.name, 'Test method "t1" already started!');
    }

    public testErrorThrownIfTestFailsAndTestStartedNotCalled(): void {
        this.assertThrowsError(
            () => this.result.testFailed('testName', new Error('Error msg')),
            M314UsageError.name,
            'Test method "testName" failed but never started!'
        );
    }

    public testUnsuccessfulResult(): void {
        this.startFailingTest('t1', new Error('Test error msg'));
        this.assertFalse(this.result.isSuccess());
    }
    
    public testSuccessfulSummary(): void {
        this.runAllTestsSuccessfully();
        this.assertEqual('TestName: 5 run, 0 failed', this.result.summary());
    }
        
    public testUnsuccessfulSummary(): void {
        let error1 = new Error("Failed!");
        let error2 = new Error("And failed again!");

        this.startFailingTest('t4', error2);
        this.startSuccessfulTest('t1');
        this.startFailingTest('t2', error1);
        this.startSuccessfulTest('t5');
        this.startSuccessfulTest('t3');

        let expectedSummary =
            'TestName: 5 run, 2 failed:\n' +
            '\n' +
            '- t2\n' +
            error1.stack + '\n' +
            '\n' +
            '- t4\n' +
            error2.stack + '\n' +
            '\n';
        this.assertEqual(expectedSummary, this.result.summary());
    }

    private startSuccessfulTest(testName: string) {
        this.result.testStarted(testName);
    }

    private startFailingTest(testName: string, error: any) {
        this.result.testStarted(testName);
        this.result.testFailed(testName, error);
    }

    private runAllTestsButOne() {
        for (let i = 1; i <= 4; i++) {
            this.result.testStarted('t' + i.toString());
            if (i % 2 === 0) this.result.testFailed('t' + i.toString(), new Error('test error message'));
        }
    }

    private runAllTestsPlusOne() {
        for (let i = 1; i <= 6; i++) {
            this.result.testStarted('t' + i.toString());
            if (i % 2 === 0) this.result.testFailed('t' + i.toString(), new Error('test error message'));
        }
    }

    private runAllTestsSuccessfully(): void {
        for (let i = 1; i <= 5; i++) {
            this.result.testStarted('t' + i.toString());
        }
    }
}
