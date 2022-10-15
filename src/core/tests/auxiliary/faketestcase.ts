import { TestCase } from "../../testcase";

export class FakeTestCase extends TestCase {
    protected _log: string = '';
    
    constructor(name: string = '') {
        super(name);
    }
    
    public setUp(): void {
        this._log += 'setUp ';
    }
    
    public tearDown(): void {
        this._log += 'tearDown ';
    }
    
    public testMethod(): void {
        this._log += 'testMethod ';
    }
    
    public testMethod2(): void {
        this._log += 'anotherTestMethod ';
    }
    
    public testBrokenMethod(): void {
        this._log += 'testBrokenMethod ';
        throw new Error('Broken method');
    }

    public get log(): string {
        return this._log;
    }
}


export class BrokenSetUpTestCase extends FakeTestCase {
    
    public setUp(): void {
        super.setUp();
        throw new Error('Broken SetUp!');
    }
}