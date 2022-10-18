import { TestResult, TestResultImpl, NoTestResult } from "../testresult";
import { TestCase } from "../testcase";

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
        try {
            let testReportOrder = ['t1', ''];
            new TestResultImpl('TestName', testReportOrder);
            this.fail();
        } catch (error) {
            let e = <Error> error;
            this.assertEqual(e.message, 'Report order must contain valid method names - it cannot contain empty strings!');
        }
    }

    public testAllTestsInReportOrderMustRun(): void {
        try {
            this.runAllTestsButOne();
            this.result.summary();
            this.fail();
        } catch (error) {
            let e = <Error> error;
            this.assertEqual(e.message, 'Not all tests ran!');
        }
    }

    private runAllTestsButOne() {
        for (let i = 1; i <= 4; i++) {
            this.result.testStarted('t' + i.toString());
            if (i % 2 === 0) this.result.testFailed('t' + i.toString(), new Error('test error message'));
        }
    }

    public testAllRanTestMustBeInReportOrder(): void {
        try {
            this.runAllTestsPlusOne();
            this.result.summary();
            this.fail();
        } catch (error) {
            let e = <Error> error;
            this.assertEqual(e.message, 'Ran more tests than those in report order array!')
        }
    }

    private runAllTestsPlusOne() {
        for (let i = 1; i <= 6; i++) {
            this.result.testStarted('t' + i.toString());
            if (i % 2 === 0) this.result.testFailed('t' + i.toString(), new Error('test error message'));
        }
    }

    public testSuccessfulResult(): void {
        this.runAllTestsSuccessfully();
        this.assertTrue(this.result.isSuccess());
    }

    private runAllTestsSuccessfully(): void {
        for (let i = 1; i <= 5; i++) {
            this.result.testStarted('t' + i.toString());
        }
    }

    public testCantRunSameTestTwice(): void {
        this.startSuccessfulTest('t1');
        try {
            this.startSuccessfulTest('t1');
            this.fail();
        } catch (error) {
            let e = <Error> error;
            this.assertEqual(e.message, 'Test method "t1" already started!');
        }
    }

    public testErrorThrownIfTestFailsAndTestStartedNotCalled(): void {
        try {
            this.result.testFailed('testName', new Error('Error msg'));
            this.fail();
        } catch (error) {
            let e = <Error> error;
            this.assertEqual(e.message, 'Test method "testName" failed but never started!');
        }
    }

    public testUnsuccessfulResult(): void {
        this.startSuccessfulTest('testName');
        this.result.testFailed('testName', new Error('Error msg'));
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
}
