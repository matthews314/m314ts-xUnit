import { TestResult, TestResultImpl, NoTestResult } from "../testresult";
import { TestSuite, TestCase } from "../testcase";
import { FakeTestCase, BrokenSetUpTestCase } from "./auxiliary/faketestcases"

export class TestCaseTest extends TestCase {
    private result: TestResult = new NoTestResult();

    public setUp(): void {
        this.result = new TestResultImpl('FakeTestCase', []);
    }

    public tearDown(): void {
        // do nothing
    }

    public testResult(): void {
        let test = new FakeTestCase('testMethod');
        test.run(this.result);
        this.assertTrue(this.result.isSuccess());
    }

    public testFailedResult(): void {
        let test = new FakeTestCase('testBrokenMethod');
        test.run(this.result);
        this.assertFalse(this.result.isSuccess());
    }

    public testFailedSetUp(): void {
        let test = new BrokenSetUpTestCase('testMethod');
        test.run(this.result);
        this.assertFalse(this.result.isSuccess());
    }

    public testSuiteSuccess(): void {
        let suite = new TestSuite();
        suite.add(new FakeTestCase('testMethod'));
        suite.add(new FakeTestCase('testMethod2'));
        suite.run(this.result);
        this.assertTrue(this.result.isSuccess());
    }

    public testSuiteFailure(): void {
        let suite = new TestSuite();
        suite.add(new FakeTestCase('testMethod'));
        suite.add(new FakeTestCase('testBrokenMethod'));
        suite.run(this.result);
        this.assertFalse(this.result.isSuccess());
    }
}
