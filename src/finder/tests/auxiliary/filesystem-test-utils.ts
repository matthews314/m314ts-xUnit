import * as path from "path";
import { FileInfo } from "../../fileinfo";
import { getFSWrapper } from "../../fswrapper";

export const TEST_DATA_FOLDER_NAME: string = 'testdata';

export function getProjectRootPath(): string {
    let idx = __dirname.indexOf('lib');
    return __dirname.substring(0, idx);
}

export function getTestDataPath(): string {
    return path.join(getProjectRootPath(), TEST_DATA_FOLDER_NAME);
}

export function getTestDataFileInfo(): FileInfo {
    return getFSWrapper().makeFileInfo(getTestDataPath());
}