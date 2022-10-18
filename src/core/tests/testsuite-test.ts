import { TestCase, TestSuite } from "../testcase";
import { FakeTestCase } from "./auxiliary/faketestcase";
import { FakeTestResult } from "./auxiliary/faketestresult";

export class TestSuiteTest extends TestCase {

    public setUp(): void {
        // do nothing
    }
    
    public tearDown(): void {
        // do nothing
    }
    
    public testRunAll(): void {
        let testcase = new FakeTestCase();
        let summary = testcase.runAll();
        let expectedSummaryBeginning =
            'FakeTestCase: 3 run, 1 failed:\n' +
            '\n' +
            '- testBrokenMethod\n';
        this.assertTrue(summary.startsWith(expectedSummaryBeginning));
    }

    public testRandomExecutionOrder(): void {
        let count = 0;
        for (let i = 0; i < 10; ++i) {
            let testSuite = this.createTestSuite();
            let testResult = new FakeTestResult();
            testSuite.run(testResult);
            if (testResult.log === 'testMethod testMethod2 testBrokenMethod ') count++;
        }
        this.assertFalse(count === 10);
    }

    private createTestSuite(): TestSuite {
        let testSuite = new TestSuite();
        testSuite.add(new FakeTestCase('testMethod'));
        testSuite.add(new FakeTestCase('testMethod2'));
        testSuite.add(new FakeTestCase('testBrokenMethod'));
        return testSuite;
    }
}
