import { FileInfo } from "./fileinfo";
import { FSWrapper } from "./fswrapper";

export class TestFinder {
    private fsWrapper: FSWrapper;

    constructor(fsWrapper: FSWrapper) {
        this.fsWrapper = fsWrapper;
    }

    public find(path: string): FileInfo[] {
        let result: FileInfo[] = [];
        let fileInfos = this.fsWrapper.listFileInfos(path);

        result = result.concat(
            fileInfos.filter(fi => {
                return fi.getName().endsWith('test') && (fi.getExtension() === '.js')
            })
        );
        
        let folders = fileInfos.filter(fi => {
            return fi.isFolder();
        });

        folders.forEach(f => {
            let found = this.find(f.getPath());
            result = result.concat(found);
        })

        return result;
    }

}