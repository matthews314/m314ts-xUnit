import { FileInfo, FileInfoImpl } from "../../fileinfo";
import { FSWrapper } from "../../fswrapper";

export const ROOT_PATH: string = '/root/';
export const ROOT_FOLDER1: string = '/root/folder1';
export const ROOT_FOLDER2: string = '/root/folder2';
export const ROOT_FILE0: string = '/root/file0';
export const ROOT_FILE1_TXT: string = '/root/file1.txt';
export const ROOT_FILE2_TEST_TXT: string = '/root/file2-test.txt';
export const ROOT_FILE3_TEST_JS: string = '/root/file3-test.js';
export const ROOT_FOLDER1_FILE4_TEST_CPP: string = '/root/folder1/file4-test.cpp';
export const ROOT_FOLDER1_FILE5_TEST_JS: string = '/root/folder1/file5-test.js';
export const ROOT_FOLDER1_FILE6_JS: string = '/root/folder1/file6.js';
export const ROOT_FOLDER2_FILE7_JS: string = '/root/folder2/file7.js';
export const ROOT_FOLDER2_FOLDER3: string = '/root/folder2/folder3';

export class FakeFSWrapper implements FSWrapper {
    
    makeFileInfo(path: string): FileInfo {
        return new FileInfoImpl(path, !path.includes('file'));
    }

    listFileInfos(path: string): FileInfo[] {
        if (path === ROOT_PATH) {
            return [
                ROOT_FOLDER1,
                ROOT_FOLDER2,
                ROOT_FILE0,
                ROOT_FILE1_TXT,
                ROOT_FILE2_TEST_TXT,
                ROOT_FILE3_TEST_JS
            ].map(p => {
                return this.makeFileInfo(p)
            });
        }
        
        if (path === ROOT_FOLDER1) {
            return [
                ROOT_FOLDER1_FILE4_TEST_CPP,
                ROOT_FOLDER1_FILE5_TEST_JS,
                ROOT_FOLDER1_FILE6_JS
            ].map(p => {
                return this.makeFileInfo(p);
            })
        }
        
        if (path === ROOT_FOLDER2) {
            return [ ROOT_FOLDER2_FILE7_JS, ROOT_FOLDER2_FOLDER3 ].map(p => {
                return this.makeFileInfo(p);
            });
        }

        return [];
    }
    
}