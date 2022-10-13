import { TestResult, TestResultImpl } from "./testresult";

export class TestSuite {
    testCases: TestCase[] = [];

    public add(testCase: TestCase): void {
        this.testCases.push(testCase);
    }

    public run(result: TestResult) {
        for (let testCase of this.testCases) {
            testCase.run(result);
        }
        
        return result;
    }
}


export abstract class TestCase {
    private name: string;
    private prototype;
    
    constructor(name: string) {
        this.name = name;
        this.prototype = Object.getPrototypeOf(this);
    }
    
    abstract setUp(): void;
    
    abstract tearDown(): void;

    public runAllAndLog(console: Console): void {
        console.log(this.runAll());
    }

    public runAll(): string {
        let result = new TestResultImpl();
        let suite = new TestSuite();
        let constructor = this.prototype.constructor;
        result.setName(constructor.name);

        for (let name of Object.getOwnPropertyNames(this.prototype)) {
            if (name.startsWith('test')) {
                let newTest = new constructor(name);
                suite.add(newTest);
            }
        }
        suite.run(result);
        return result.summary();
    }

    public run(result: TestResult) {
        result.testStarted();
        try {
            this.setUp();
            // @ts-ignore
            this[this.name]();
        } catch (error) {
            result.testFailed(this.name, error);
        }
        
        this.tearDown();
        
        return result;
    }
    
    public assertEqual(a: any, b: any) {
        if (typeof a !== typeof b) throw new Error("Type mismatch! " + (typeof a) + " is not equal to " + (typeof b));
        if (a !== b) {
            let type = typeof a;
            if (typeof a === 'symbol') {
                a = (a as Symbol).toString();
                b = (b as Symbol).toString();
            }
            if (typeof a === 'string') {
                a = this.indentMultilineString(a);
                b = this.indentMultilineString(b);
            }
            let errormsg = `Arguments have the same type (${type}) but are different!\n` +
                'First Argument:\n\t' + a + '\n' +
                'Second Argument:\n\t' + b;
            throw new Error(errormsg);   
        }
    }

    private indentMultilineString(str: string) {
        let result = '';
        if (str !== '') {
            let lines = str.split('\n');
            result = lines[0];
            for (let i = 1; i < lines.length; ++i) {
                result += '\n\t' + lines[i];
            }
        }
        return result;
    }

    public assertTrue(x: boolean) {
        if (!x) throw new Error("Expected true, but was false!");
    }

    public assertFalse(x: boolean) {
        if (x) throw new Error("Expected false, but was true!");
    }

    public fail() {
        throw new Error("Test was forced to fail!");
    }
}