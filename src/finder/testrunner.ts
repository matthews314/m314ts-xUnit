import { TestSuite } from "../core/testcase";
import { TestResultImpl } from "../core/testresult";
import { TestCase } from "../main";

export class TestRunner {

    async run(testFilePath: string): Promise<string> {
        return await import(testFilePath).then((module) => {
            let klass = this.getClassFrom(module);
            let testNames = this.getTestNamesFor(klass);
            let suite = this.createSuite(klass, testNames);
            let result = new TestResultImpl(klass.name, testNames);
            return suite.run(result).summary();
        });
    }

    private getClassFrom(module: any): ObjectConstructor {
        return module[Object.keys(module)[0]];
    }

    private createSuite(klass: ObjectConstructor, testNames: string[]) {
        let suite = new TestSuite();
        testNames.forEach(name => suite.add(<TestCase> new klass(name)));
        return suite;
    }

    private getTestNamesFor(klass: ObjectConstructor) {
        return Object.getOwnPropertyNames(klass.prototype).filter(n => n.startsWith('test'));
    }
}