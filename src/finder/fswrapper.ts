import * as fs from "fs";
import * as pathmod from "path";
import { FileInfo, FileInfoImpl } from "./fileinfo";


export interface FSWrapper {
    makeFileInfo(path: string): FileInfo;
    listFileInfos(path: string): FileInfo[];
}

class FSWrapperImpl {

    public makeFileInfo(path: string): FileInfo {
        let fd = fs.openSync(path, 'r');
        let stats = fs.fstatSync(fd);
        return new FileInfoImpl(path, stats.isDirectory());
        
    }
    
    public listFileInfos(path: string): FileInfo[] {
        let filenames = fs.readdirSync(path);
        return filenames.map(f => {
            return this.makeFileInfo(pathmod.join(path, f));
        });
    }
}


let fsWrapper: FSWrapper = new FSWrapperImpl();

export function getFSWrapper() {
    return fsWrapper;
}