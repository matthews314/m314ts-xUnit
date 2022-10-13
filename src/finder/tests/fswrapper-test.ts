import * as path from "path";
import { TestCase } from "../../main";
import { FileInfo } from "../fileinfo";
import { getFSWrapper } from "../fswrapper";
import { getTestDataFileInfo, getTestDataPath } from "./auxiliary/filesystem-test-utils";

class FSWrapperTest extends TestCase {

    public setUp(): void {
    }

    public tearDown(): void {
        // do nothing
    }

    public testMakeFileInfoFromFolderPath() {
        this.assertTrue(getTestDataFileInfo().isFolder());
    }

    public testMakeFileInfoFromFilePath() {
        let filepath = path.join(getTestDataPath(), 'fileA');
        let fileInfo: FileInfo = getFSWrapper().makeFileInfo(filepath);
        this.assertTrue(fileInfo.isActualFile());
    }  

    public testListFilesInFolder() {
        let fileInfos = getFSWrapper().listFileInfos(getTestDataPath());
        this.assertTrue(fileInfos.length === 4);
        this.assertEqual('fileA', fileInfos[0].getName());
        this.assertEqual('fileB', fileInfos[1].getName());
        this.assertEqual('fileC', fileInfos[2].getName());
        this.assertEqual('fileD', fileInfos[3].getName());
        this.assertEqual('.txt', fileInfos[3].getExtension());
    }
}

new FSWrapperTest('').runAllAndLog(console);