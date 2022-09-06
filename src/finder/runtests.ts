import { getFSWrapper } from "./fswrapper";
import { TestFinder } from "./testfinder";
import { getProjectRootPath } from "./tests/auxiliary/filesystem-test-utils";
import { spawnSync } from "child_process";
import { argv, exit } from "process";

let rootpath = getProjectRootPath();
if (rootpath.includes('node_modules')) {
    rootpath = rootpath.substring(0, rootpath.indexOf('node_modules'));
}

if (argv.length === 3) {
    rootpath = argv[2];
} else if (argv.length > 3) {
    console.error('Error! Only one argument can be passed to runtests, and it must be a path!');
    exit();
}

let finder = new TestFinder(getFSWrapper());
let found = finder.find(getProjectRootPath());

found.forEach(f => {
    const node = spawnSync('node', [f.getPath()], { encoding : 'utf8' });
    process.stdout.write(node.stdout);
});
