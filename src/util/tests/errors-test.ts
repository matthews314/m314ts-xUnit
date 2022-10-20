import { TestCase } from "../../main";
import { M314UsageError } from "../errors";

export class ErrorsTest extends TestCase {

    public setUp(): void {
        // do nothing
    }

    public tearDown(): void {
        // do nothing
    }

    public testUsageError() {
        let error = new M314UsageError("This is a usage error!");
        this.assertEqual(error.message, "This is a usage error!");
    }
}