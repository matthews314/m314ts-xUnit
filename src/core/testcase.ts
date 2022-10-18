import { TestResult, TestResultImpl } from "./testresult";

export class TestSuite {
    testCases: TestCase[] = [];

    public add(testCase: TestCase): void {
        this.testCases.push(testCase);
    }

    public run(result: TestResult) {
        shuffle(this.testCases).forEach(t => t.run(result));        
        return result;
    }
}


export class TestFailedError extends Error {};


export class TestFailedForcefullyError extends TestFailedError {
    constructor() {
        super('Test was forced to fail!');
    }
};


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
        let suite = new TestSuite();
        let constructor = this.prototype.constructor;
        let testNames: string[] = [];

        for (let name of Object.getOwnPropertyNames(this.prototype)) {
            if (name.startsWith('test')) {
                let newTest = new constructor(name);
                suite.add(newTest);
                testNames.push(name);
            }
        }
        
        let result = new TestResultImpl(constructor.name, testNames);
        suite.run(result);
        return result.summary();
    }

    public run(result: TestResult) {
        result.testStarted(this.name);
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
        if (typeof a !== typeof b) throw new TestFailedError("Type mismatch! " + (typeof a) + " is not equal to " + (typeof b));
        if (a !== b) {
            let type = typeof a;
            if (typeof a === 'string') this.handleDifferentStrings(a, b);
            else if (typeof a === 'symbol') this.handleDifferentSymbols(a, b);
            else throw new TestFailedError(this.errormsg(type, a, b));
        }
    }

    private handleDifferentStrings(a: string, b: string) {
        a = this.indentMultilineString(a);
        b = this.indentMultilineString(b);
        throw new TestFailedError(this.errormsg('string', a, b));
    }

    private handleDifferentSymbols(a: Symbol, b: Symbol) {
        let arg1: string = this.indentMultilineString(a.toString());
        let arg2: string = this.indentMultilineString(b.toString());
        throw new TestFailedError(this.errormsg('symbol', arg1, arg2));
    }

    private errormsg(type: string, a: any, b: any) {
        return 'Arguments have the same type (' + type + ') but are different!\n' +
            'First Argument:\n\t' + a + '\n' +
            'Second Argument:\n\t' + b;
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
        if (!x) throw new TestFailedError("Expected true, but was false!");
    }

    public assertFalse(x: boolean) {
        if (x) throw new TestFailedError("Expected false, but was true!");
    }

    public fail() {
        throw new TestFailedForcefullyError();
    }
}

function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}