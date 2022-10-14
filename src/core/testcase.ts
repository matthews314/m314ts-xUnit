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
            if (typeof a === 'string') this.handleDifferentStrings(a, b);
            else if (typeof a === 'symbol') this.handleDifferentSymbols(a, b);
            else throw new Error(this.errormsg(type, a, b));
        }
    }

    private handleDifferentStrings(a: string, b: string) {
        a = this.indentMultilineString(a);
        b = this.indentMultilineString(b);
        throw new Error(this.errormsg('string', a, b));
    }

    private handleDifferentSymbols(a: Symbol, b: Symbol) {
        let arg1: string = this.indentMultilineString(a.toString());
        let arg2: string = this.indentMultilineString(b.toString());
        throw new Error(this.errormsg('symbol', arg1, arg2));
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
        if (!x) throw new Error("Expected true, but was false!");
    }

    public assertFalse(x: boolean) {
        if (x) throw new Error("Expected false, but was true!");
    }

    public fail() {
        throw new Error("Test was forced to fail!");
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