import { TestCase } from "../../main";
import { M314UsageError } from "../../util/errors";
import { ArgsParser } from "../argsparser";


export class ArgsParserBaseTest extends TestCase {
    
    setUp(): void {
        // do nothing
    }

    tearDown(): void {
        // do nothing
    }

    testErrorThrownOnPrjPathNonAbsolute() {
        this.assertThrowsError(
            () => new ArgsParser('../some/path'),
            M314UsageError.name,
            'Script path must be absolute, but it was "../some/path"!'
        );
    }

    testErrorThrownOnEmptyPrjPath() {
        this.assertThrowsError(
            () => new ArgsParser(''),
            M314UsageError.name,
            'Script path must be absolute, but it was ""!'
        );
    }
    
    testErrorThrownOnInvalidPrjPath() {
        this.assertThrowsError(
            () => new ArgsParser('/path/to/prj'),
            M314UsageError.name,
            'Script path must lead to the directory containing runtests.js!'
        );
    }

    testProjectRootPathDetectionForDevs() {
        let parser = new ArgsParser('/path/to/prj/lib/');
        this.assertEqual(this.getProjectPath(parser), '/path/to/prj/');
    }
    
    testProjectRootPathDetectionForUsers() {
        let parser = new ArgsParser('/path/to/prj/node_modules/m314ts-xunit/lib/');
        this.assertEqual(this.getProjectPath(parser), '/path/to/prj/');
    }

    private getProjectPath(parser: ArgsParser): string {
        parser.parse(['testArg0', 'testArg1', './']);
        return parser.path;
    }

}