import { TestCase } from "../testcase";


export class AssertionsTest extends TestCase {
 
    public setUp(): void {
        // do nothing
    }

    public tearDown(): void {
        // do nothing
    }

    public testUndefinedEqualsUndefined(): void {
        this.assertEqual(undefined, undefined);
    }
    
    public testNullEqualsNull(): void {
        this.assertEqual(null, null);
    }

    public testErrorMessageForAssertEqualStrings(): void {
        let expectedErrorMessage = 'Arguments have the same type (string) but are different!\n' +
            'First Argument:\n\tmessage1\n' +
            'Second Argument:\n\tmessage2';
        this.assertErrorMessageForAssertEqual("message1", "message2", expectedErrorMessage);
    }
    
    public testErrorMessageForAssertEqualIntegers(): void {
        let expectedErrorMessage = 'Arguments have the same type (number) but are different!\n' +
            'First Argument:\n\t1\n' +
            'Second Argument:\n\t2';
        this.assertErrorMessageForAssertEqual(1, 2, expectedErrorMessage);
    }
    
    public testErrorMessageForAssertEqualFloats(): void {
        let expectedErrorMessage = 'Arguments have the same type (number) but are different!\n' +
            'First Argument:\n\t1.5\n' +
            'Second Argument:\n\t2.3';
        this.assertErrorMessageForAssertEqual(1.5, 2.3, expectedErrorMessage);
    }

    public testErrorMessageForAssertEqualBigInt(): void {
        const x: BigInt = BigInt(Number.MAX_SAFE_INTEGER) + 2n;
        const y: BigInt = BigInt(Number.MAX_SAFE_INTEGER) + 6n;
        let expectedErrorMessage = 'Arguments have the same type (bigint) but are different!\n' +
            'First Argument:\n\t9007199254740993\n' +
            'Second Argument:\n\t9007199254740997';
        this.assertErrorMessageForAssertEqual(x, y, expectedErrorMessage);
    }
    
    public testErrorMessageForAssertEqualNan(): void {
        let expectedErrorMessage = 'Arguments have the same type (number) but are different!\n' +
            'First Argument:\n\tNaN\n' +
            'Second Argument:\n\tNaN';
        this.assertErrorMessageForAssertEqual(NaN, NaN, expectedErrorMessage);
    }

    public testErrorMessageForAssertEqualMultilineStrings(): void {
        let string1 = "This is\na multiline\nstring.";
        let string2 = "This, instead,\nis another,\n\tindented,\nmultiline string.";
        let expectedErrorMessage = 'Arguments have the same type (string) but are different!\n' +
            'First Argument:\n' +
                '\tThis is\n' +
                '\ta multiline\n' +
                '\tstring.\n' +
            'Second Argument:\n' +
                '\tThis, instead,\n' +
                '\tis another,\n' +
                    '\t\tindented,\n' +
                '\tmultiline string.';
        this.assertErrorMessageForAssertEqual(string1, string2, expectedErrorMessage);
    }

    public testErrorMessageForAssertEqualBooleans(): void {
        let expectedErrorMessage = 'Arguments have the same type (boolean) but are different!\n' +
            'First Argument:\n\ttrue\n' +
            'Second Argument:\n\tfalse';
        this.assertErrorMessageForAssertEqual(true, false, expectedErrorMessage);
    }

    public testErrorMessageForAssertEqualSymbols(): void {
        let expectedErrorMessage = 'Arguments have the same type (symbol) but are different!\n' +
            'First Argument:\n\tSymbol(ciccio)\n' +
            'Second Argument:\n\tSymbol(12)';
        this.assertErrorMessageForAssertEqual(Symbol('ciccio'), Symbol(12), expectedErrorMessage);
    }

    public testErrorMessageForAssertEqualSymbolsMultiline(): void {
        let string1 = "This is\na multiline\nstring.";
        let string2 = "This, instead,\nis another,\n\tindented,\nmultiline string.";
        let expectedErrorMessage = 'Arguments have the same type (symbol) but are different!\n' +
            'First Argument:\n' +
                '\tSymbol(This is\n' +
                '\ta multiline\n' +
                '\tstring.)\n' +
            'Second Argument:\n' +
                '\tSymbol(This, instead,\n' +
                '\tis another,\n' +
                    '\t\tindented,\n' +
                '\tmultiline string.)';
        this.assertErrorMessageForAssertEqual(Symbol(string1), Symbol(string2), expectedErrorMessage);
    }

    private assertErrorMessageForAssertEqual(arg1: any, arg2: any, expectedMsg: string) {
        try {
            this.assertEqual(arg1, arg2);
            this.fail();
        } catch (error) {
            let e = <Error> error;
            if (e.message === "Test was forced to fail!") throw error;
            this.assertEqual(e.message, expectedMsg);
        }
    }
}