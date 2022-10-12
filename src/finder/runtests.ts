import { getFSWrapper } from "./fswrapper";
import { TestFinder } from "./testfinder";
import { spawnSync } from "child_process";
import { argv, exit } from "process";
import { getProjectRootPath } from "./getprojectroot";
import path from "path";

let rootpath = getProjectRootPath();
if (rootpath.includes('node_modules')) {
    rootpath = rootpath.substring(0, rootpath.indexOf('node_modules'));
}

if (argv.length === 3) {
    if (path.isAbsolute(argv[2]))
        rootpath = argv[2];
    else
        rootpath = path.join(rootpath, argv[2]);
} else if (argv.length > 3) {
    console.error('Error! Only one argument can be passed to runtests, and it must be a path!');
    exit();
}

let finder = new TestFinder(getFSWrapper());
let found = finder.find(rootpath);

found.forEach(f => {
    import(f.getPath());
})
