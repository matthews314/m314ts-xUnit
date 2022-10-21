import * as path from "path";
import { TestCase } from "../../main";
import { FileInfo, NoFileInfo } from "../fileinfo";
import { getFSWrapper } from "../fswrapper";
import { FS_TEST_DATA_FOLDER_NAME, getTestDataFileInfo, getTestDataPath, TEST_DATA_FOLDER_NAME } from "./auxiliary/filesystem-test-utils";


export class ActualFileInfoTest extends TestCase {
    private fileAPath: string = '';
    private fileDPath: string = '';
    private fileA: FileInfo = new NoFileInfo();
    private fileD: FileInfo = new NoFileInfo();
    
    public setUp(): void {
        this.fileAPath = path.join(getTestDataPath(), 'fileA');
        this.fileDPath = path.join(getTestDataPath(), 'fileD.txt');
        this.fileA = getFSWrapper().makeFileInfo(this.fileAPath);
        this.fileD = getFSWrapper().makeFileInfo(this.fileDPath);
    }

    public tearDown(): void {
        // do nothing
    }

    public testGetPathFromFolderInfo() {
        this.assertEqual(getTestDataPath(), getTestDataFileInfo().getPath());
    }

    public testGetFolderName() {
        this.assertEqual(FS_TEST_DATA_FOLDER_NAME, getTestDataFileInfo().getName());
    }

    public testGetPathFromActualFileInfo() {
        this.assertEqual(this.fileAPath, this.fileA.getPath());
    }

    public testGetFileNameWhenNoExtension() {
        this.assertEqual('fileA', this.fileA.getName());
    }

    public testGetFileName() {
        this.assertEqual('fileD', this.fileD.getName());
    }
    
    public testGetFileExtensionWhenNoExtension() {
        this.assertEqual('', this.fileA.getExtension());
    }

    public testGetFileExtension() {
        this.assertEqual('.txt', this.fileD.getExtension());
    }
}
