import { TestCase } from "../testcase";
import { FakeTestCase } from "./auxiliary/faketestcase";

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
}
