import { isAbsolute, join } from "path";
import { M314UsageError } from "../util/errors";

const NODE_MODULES = 'node_modules';
const FOLDER_CONTAINING_RUNTESTS = 'lib';
const PATH_ARG_IDX = 2;

export class ArgsParser {
    private prjRootPath: string = '';
    private testsPath: string = '';

    constructor(scriptPath: string) {
        this.assertAbsolute(scriptPath);
        this.assertValid(scriptPath);
        this.prjRootPath = this.findProjectRoot(scriptPath);
    }
    
    private assertAbsolute(scriptPath: string): void {
        if (!isAbsolute(scriptPath))
            throw new M314UsageError(`Script path must be absolute, but it was "${scriptPath}"!`);
    }

    private assertValid(scriptPath: string): void {
        if (!scriptPath.includes(FOLDER_CONTAINING_RUNTESTS))
            throw new M314UsageError('Script path must lead to the directory containing runtests.js!');
    }

    private findProjectRoot(scriptPath: string): string {
        if (this.isAnInstalledDependency(scriptPath))
            return this.cdOutOfFolder(scriptPath, NODE_MODULES);
        return this.cdOutOfFolder(scriptPath, FOLDER_CONTAINING_RUNTESTS);
    }

    private isAnInstalledDependency(runtestsFilePath: string): boolean {
        return runtestsFilePath.includes(NODE_MODULES);
    }

    private cdOutOfFolder(path: string, folderName: string): string {
        let idx = path.lastIndexOf(folderName);
        return path.substring(0, idx);
    }

    parse(args: string[]) {
        this.computePath(args);
    }

    private computePath(args: string[]): void {
        let pathArg = args[PATH_ARG_IDX];
        if (isAbsolute(pathArg)) this.testsPath = pathArg;
        else this.buildAbsolutePathFrom(pathArg);
    }

    private buildAbsolutePathFrom(pathArg: string): void {
        this.testsPath = join(this.prjRootPath, pathArg);
    }

    get path(): string {
        return this.testsPath;
    }
}