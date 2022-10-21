import { getFSWrapper } from "./fswrapper";
import { TestFinder } from "./testfinder";
import { ArgsParser } from "./argsparser";

let parser = new ArgsParser(__dirname);
parser.parse(process.argv);

let finder = new TestFinder(getFSWrapper());
let found = finder.find(parser.path);

found.forEach(f => {
    import(f.getPath()).then((module) => {
        let classObj = module[Object.keys(module)[0]];
        new classObj('').runAllAndLog(console);
    });
})
