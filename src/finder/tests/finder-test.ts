import { TestCase } from "../../main"
import { FSWrapper } from "../fswrapper";
import { TestFinder } from "../testfinder";
import { FakeFSWrapper, ROOT_FOLDER1, ROOT_FOLDER2_FOLDER3, ROOT_PATH } from "./auxiliary/fakefswrapper";

class FinderTest extends TestCase {
    private fsWrapper: FSWrapper = new FakeFSWrapper();
    private finder: TestFinder = new TestFinder(this.fsWrapper);

    public setUp(): void {
        // do nothing
    }

    public tearDown(): void {
        // do nothing
    }

    public testFindInEmptyFolder() {
        let found = this.finder.find(ROOT_FOLDER2_FOLDER3);
        this.assertTrue(found.length === 0);
    }

    public testFindInNonEmptyFolder() {
        let found = this.finder.find(ROOT_FOLDER1);
        this.assertTrue(found.length === 1);
        this.assertEqual(found[0].getName(), 'file5-test');
        this.assertEqual(found[0].getExtension(), '.js');
    }
    
    public testRecursiveFind() {
        let found = this.finder.find(ROOT_PATH);
        this.assertTrue(found.length === 2);
        this.assertEqual(found[0].getName(), 'file3-test');
        this.assertEqual(found[0].getExtension(), '.js');
        this.assertEqual(found[1].getName(), 'file5-test');
        this.assertEqual(found[1].getExtension(), '.js');
    }
}

new FinderTest('').runAllAndLog(console);