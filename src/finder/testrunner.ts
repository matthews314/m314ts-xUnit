
export class TestRunner {

    async run(testFilePath: string): Promise<string> {
        return await import(testFilePath).then((module) => {
            let classObj = module[Object.keys(module)[0]];
            return new classObj('').runAll();
        });
    }
}