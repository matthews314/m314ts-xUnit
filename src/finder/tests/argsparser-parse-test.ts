import { TestCase } from "../../main";
import { ArgsParser } from "../argsparser";

export class ArgsParserTest extends TestCase {
    private parser: ArgsParser = new ArgsParser('/path/to/prj/lib/');

    setUp(): void {
        // do nothing
    }
    
    tearDown(): void {
        // do nothing
    }

    testParseRelPath() {
        this.parser.parse(this.argvFrom(['./test/path']));
        this.assertEqual(this.parser.path, '/path/to/prj/test/path');
    }
    
    testParseAbsPath() {
        this.parser.parse(this.argvFrom(['/path/to/my/tests']));
        this.assertEqual(this.parser.path, '/path/to/my/tests');
    }  

    testExceedingArgumentsAreIgnored() {
        let argv = this.argvFrom(['/path/to/my/tests', 'more', 'and more', 'and even more'])
        this.parser.parse(argv);
        this.assertEqual(this.parser.path, '/path/to/my/tests')
    }

    private argvFrom(args: string[]): string[] {
        return ['node', __filename].concat(args);
    }
}