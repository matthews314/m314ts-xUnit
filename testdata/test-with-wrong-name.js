"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const testcase = require('../lib/core/testcase');

class TestWithWrongName extends testcase.TestCase {
    setUp() {
        // do nothing
    }
    tearDown() {
        // do nothing
    }
    
    testOne() {
        this.assertTrue(true);
    }

    testTwo() {
        this.assertFalse(false);
    }
}

exports.TestWithWrongName = TestWithWrongName;