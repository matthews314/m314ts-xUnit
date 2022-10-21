import path from "path";
import { TestCase } from "../../main";
import { TestRunner } from "../testrunner";


export class RunnerTest extends TestCase {

    setUp(): void {
        // do nothing
    }

    tearDown(): void {
        // do nothing
    }

    async testRun() {
        let idx = __dirname.lastIndexOf('lib');
        let toRun = path.join(__dirname.substring(0, idx), "/testdata/test-with-wrong-name.js");

        let runner = new TestRunner();
        let result = await runner.run(toRun);
        this.assertEqual(result, "TestWithWrongName: 2 run, 0 failed");
    }    
}