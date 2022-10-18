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
        try {
            throw new M314UsageError("This is a usage error!");
            this.fail();
        } catch (error) {
            this.assertEqual((<M314UsageError> error).message, "This is a usage error!");
        }
    }
}