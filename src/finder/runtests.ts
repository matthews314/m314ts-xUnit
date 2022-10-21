import { getFSWrapper } from "./fswrapper";
import { TestFinder } from "./testfinder";
import { ArgsParser } from "./argsparser";
import { TestRunner } from "./testrunner";

let parser = new ArgsParser(__dirname);
parser.parse(process.argv);

let finder = new TestFinder(getFSWrapper());
let found = finder.find(parser.path);

let runner = new TestRunner();
found.forEach(f => runner.run(f.getPath()).then(console.log));