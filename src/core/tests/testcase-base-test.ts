import { TestResult, TestResultImpl, NoTestResult } from "../testresult";
import { TestCase } from "../testcase";
import { FakeTestCase, BrokenSetUpTestCase } from "./auxiliary/faketestcases";

export class BaseTests extends TestCase {
    private result: TestResult = new NoTestResult();

    public setUp(): void {
        this.result = new TestResultImpl('FakeTestCase', []);
    }

    public tearDown(): void {
        // do nothing
    }

    public testEmptyLog(): void {
        let test = new FakeTestCase('testMethod');
        this.assertEqual(test.log, '');
    }

    public testTemplateMethod(): void {
        let test = new FakeTestCase('testMethod');
        test.run(this.result);
        this.assertEqual(test.log, 'setUp testMethod tearDown ');
    }

    public testTearDownEvenIfTestFailed(): void {
        let test = new FakeTestCase('testBrokenMethod');
        test.run(this.result);
        this.assertEqual(test.log, "setUp testBrokenMethod tearDown ");
    }

    public testTearDownEvenIfSetUpFailed(): void {
        let test = new BrokenSetUpTestCase('');
        test.run(this.result);
        this.assertEqual(test.log, "setUp tearDown ");
    }
}
