import { TestSuite } from "../core/testcase";
import { TestResultImpl } from "../core/testresult";
import { TestCase } from "../main";

export class TestRunner {

    async run(testFilePath: string): Promise<string> {
        return await import(testFilePath).then((module) => {
            let classObj: ObjectConstructor = module[Object.keys(module)[0]];
            return this.runAll(classObj);
        });
    }

    private runAll(klass: ObjectConstructor) {
        let suite = new TestSuite();
        let testNames: string[] = [];

        for (let name of Object.getOwnPropertyNames(klass.prototype)) {
            if (name.startsWith('test')) {
                let newTest = new klass(name);
                suite.add(<TestCase> newTest);
                testNames.push(name);
            }
        }
        
        let result = new TestResultImpl(klass.name, testNames);
        suite.run(result);
        return result.summary();     
    }
}