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
        if (typeof a !== typeof b) throw new Error("Type mismatch! " + typeof a + " is not equal to " + typeof b);
        if (a !== b) throw new Error("Arguments have same type but are different!");
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