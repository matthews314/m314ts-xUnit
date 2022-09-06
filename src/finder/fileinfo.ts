import * as pathmod from "path";

export interface FileInfo {
    isFolder(): boolean;
    isActualFile(): boolean;
    getPath(): string;
    getName(): string;
    getExtension(): string;
}

export class NoFileInfo implements FileInfo {
    public isFolder(): boolean {
        throw new Error("Method not implemented.");
    }
    public isActualFile(): boolean {
        throw new Error("Method not implemented.");
    }
    public getPath(): string {
        throw new Error("Method not implemented.");
    }
    public getName(): string {
        throw new Error("Method not implemented.");
    }
    public getExtension(): string {
        throw new Error("Method not implemented.");
    }
}

export class FileInfoImpl implements FileInfo {
    private path: string;
    private _isFolder: boolean;

    constructor(path: string, isFolder: boolean) {
        this.path = path;
        this._isFolder = isFolder;
    }
    
    public isFolder(): boolean {
        return this._isFolder;
    }

    public isActualFile(): boolean {
        return !this._isFolder;
    }

    public getPath(): string {
        return this.path;
    }

    public getName(): string {
        return pathmod.basename(this.path, this.getExtension());
    }

    public getExtension(): string {
        return pathmod.extname(this.path);
    }
}