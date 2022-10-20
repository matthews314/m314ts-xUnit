import { TestCase, TestFailedError } from "../testcase";

class MyError extends Error {}
class WrongError extends Error {}

export class AssertThrowsErrorTest extends TestCase {

    setUp(): void {
        // do nothing
    }

    tearDown(): void {
        // do nothing
    }
    
    testMessageNotChecked1(): void {
        this.assertThrowsError(this.errorThrower(), MyError.name);
    }

    testMessageNotChecked2(): void {
        this.assertThrowsError(this.errorThrower('test error'), MyError.name);
    }

    testEmptyMessageChecked(): void {
        this.assertThrowsError(this.errorThrower(''), MyError.name, '');
    }
    
    testMessageCheckedHappyPath(): void {
        this.assertThrowsError(this.errorThrower('test error'), MyError.name, 'test error');
    }

    testReturnsError(): void {
        let e = this.assertThrowsError(this.errorThrower('very specific message'), MyError.name);
        this.assertEqual((<Object> e).constructor.name, MyError.name);
        this.assertEqual((<MyError> e).message, 'very specific message');
    }

    testMessageCheckedSadPath(): void {
        const f = () => {
            this.assertThrowsError(this.errorThrower('test error'), MyError.name, 'wrong message');
        };
        this.assertThrowsError(f, TestFailedError.name, 'Expected error message to be "wrong message", but was "test error"!');
    }
    
    testEmptyMessageCheckedSadPath(): void {
        const f = () => {
            this.assertThrowsError(this.errorThrower(''), MyError.name, 'wrong message');
        };
        this.assertThrowsError(f, TestFailedError.name, 'Expected error message to be "wrong message", but was ""!');
    }

    testClassCheckedSadPath(): void {
        const f = () => {
            this.assertThrowsError(this.errorThrower('test error'), WrongError.name);
        };
        this.assertThrowsError(f, TestFailedError.name, "Expected error's class to be WrongError, but was MyError!");
    }

    private errorThrower(errorMsg: string | undefined = undefined): () => void {
        if (errorMsg) return () => { throw new MyError(errorMsg); };
        return () => { throw new MyError(); };
    }
}