# m314ts-xUnit
My take on xUnit in TypeScript.

I followed the TDD book by Kent Beck.
He implements some xUnit functionalities from scratch in Python and I did the same in TypeScript since I needed a testing framework but didn't feel like learning a native JS testing framework. Also, I needed something to practice with TypeScript, so why not.

At the moment, the framework allows you to extend the "TestCase" class to write your own tests. TestCase is abstract, so that you don't forget to write setUp and tearDown methods. If you don't need them just leave them empty, but at least you'll be forced to remember that the feature is there if you need it.

The framework reflectively finds all the methods that begin with "test" in a TestCase, so just keep in mind you need to call your tests according to that rule in order to be able to run them.

Also, by now there is no script to launch all tests, or stuff like that. So, you need to launch the test class "manually". I compile the thing with tsc and then run node passing the test I want to run. Since I used TDD to develop it, you can find all the examples you need to understand how to use it in dst/tests.

As soon as I'll add more features, I'll update the README. Sooner or later I'll take the time to make it better. Cheers.
