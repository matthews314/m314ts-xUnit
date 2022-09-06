import * as path from "path";
import { FileInfo } from "../../fileinfo";
import { getFSWrapper } from "../../fswrapper";
import { getProjectRootPath } from "../../getprojectroot";

export const TEST_DATA_FOLDER_NAME: string = 'testdata';

export function getTestDataPath(): string {
    return path.join(getProjectRootPath(), TEST_DATA_FOLDER_NAME);
}

export function getTestDataFileInfo(): FileInfo {
    return getFSWrapper().makeFileInfo(getTestDataPath());
}