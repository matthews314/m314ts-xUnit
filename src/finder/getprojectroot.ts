export function getProjectRootPath(): string {
    let idx = __dirname.indexOf('lib');
    return __dirname.substring(0, idx);
}