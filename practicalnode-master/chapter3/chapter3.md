Chapter 3
---------
# TDD and BDD for Node.js with Mocha

Test-driven development (TDD), as many of you might know, is one of the main, agile development techniques. The genius of TDD lies in increased quality of code, faster development resulting from greater programmer confidence, and improved bug detection (duh!).

Historically, web apps have been hard to autotest, and developers relied heavily on manual testing. But, certain parts such as standalone services and REST API can be *and should be* tested thoroughly by the TDD. At the same time, rich user interface (UI) / user experience (UX) can be tested with headless browsers such as PhantomJS.

And before you start yawning and thinking about skipping this chapter because well, I won't be far off to say that a lot of developers like testing as much as they might like a warm can of beer on a hot Sunday afternoon at the beach, please think about testing as the **time saver**. With proper tests in place and a bit of time spent on writing them, developers save time in the long-term. The longer the long-term the more the pay off. It's not uncommone for *a good module* to have 2-3x of tests than the code itself. Crazy? No. It's not an overkill but a smart and pragmatic strategy!

But what is BDD then? The behavior-driven development (BDD) concept is based on TDD. It differs from TDD in language, which encourages collaboration between product owners and programmers.

Similar to building apps themselves, most of the time software engineers should use a testing framework. To get you started with the Node.js testing framework, Mocha, in this chapter, we cover the following:

- Installing and understanding Mocha
- TDD with the assert
- BDD with Expect.js
- Project: writing the first BDD test for Blog

The source code for this chapter is in the `ch3` folder of the practicalnode(<https://github.com/azat-co/practicalnode>) GitHub repository (https://github.com/azat-co/practicalnode).

# Installing and Understanding Mocha

Mocha is a mature and powerful testing framework for Node.js. To install it globally, simply run:

```
$ npm i –g mocha@4.0.1
```

**Note**: We use a specific version (the latest as of this writing is 4.0.1) to prevent inconsistency in this book&#39;s examples caused by potential breaking changes in future versions of Mocha.

If you encounter the lack-of-permissions issue, discussed in Chapters 1 and 2, run:

```
$ sudo npm i –g mocha@4.0.1
```

To avoid using `sudo`, follow the instructions in Chapter 1 on how to install Node.js correctly... or just install Mocha locally. 

**Tip**: It&#39;s possible to have a separate version of Mocha for each project by simply pointing to the local version of Mocha, which you install like any other npm module into `node_modules`. The command will be:

```
$ ./node_modules/.bin/mocha test_name
```

for macOS / Linux. For an example, refer to "Putting Configs into a Makefile" later in this chapter. For my Windows users which cannot use `.` just remove it to have this command:

```
$ node_modules\.bin\mocha test_name
```


Most of you have heard about TDD and why it&#39;s a good thing to follow. The main idea of TDD is to do the following:

- Define a unit test
- Implement the unit
- Verify that the test passes

BDD is a specialized version of TDD that specifies what needs to be unit-tested from the perspective of business requirements. It&#39;s possible to just write test with good old plain core Node.js module `assert`. However, as in many other situations, using a framework is more preferable. For both TDD and BDD, we&#39;ll be using the Mocha testing framework because we gain many things for “free.” Among them are the following:

- Reporting
- Asynchronous support
- Rich configurability

Here is a list of some of the  optional parameters (options) that the `$ mocha [options]` command takes (full list is obtainable with `mocha -h`):

- `-h` or `--help`: print help information for the Mocha command
- `-V` or `--version`: print the version number that's being used
- `-r` or `--require <name>`: require a module with the name provided
- `-R` or `--reporter <name>`: use a reporter with the name provided
- `-u` or `--ui <name>`: use the stipulated reporting user interface (such as `bdd`, `tdd`)
- `-g` or `--grep <pattern>`: run tests exclusively with a matching pattern
- `-i` or `--invert`: invert the `--grep` match pattern
- `-t` or `--timeout <ms>`: set the test case time out in milliseconds (for example, 5000)
- `-s` or `--slow <ms>`: set the test threshold in milliseconds (for example, 100)
- `-w` or `--watch`: watch test files for changes while hanging on the terminal
- `-c` or `--colors`: enable colors
- `-C` or `--no-colors`: disable colors
- `-G` or `--growl`: enable macOS Growl notifications
- `-d` or `--debug`: enable the Node.js debugger—`$ node --debug`
- `--debug-brk`: enable the Node.js debugger breaking on the first line—`$ node --debug-brk`
- `-b` or `--bail`: exit after the first test failure
- `-A` or `--async-only`: set all tests in asynchronous mode
- `--recursive`: use tests in subfolders
- `--globals <names>`: provide comma-delimited global names
- `--check-leaks`: check for leaks in global variables
- `--interfaces`: print available interfaces
- `--reporters`: print available reporters
- `--compilers <ext>:<module>,...`: provide compiler to use

Figure 3-1 shows an example of nyan cat reporter with the command `$ mocha test-expect.js -R nyan`. I mean, how can someone don't like a testing framework which supports a nyan cat reporter?! 😺

![alt](media/image1.png)

***Figure 3-1.** Mocha nyan reporter*

Usually, when it comes to choosing a type of framework, there are a few options. Mocha is one of the more robust and widely used. However, the following alternatives to Mocha are worth considering:

- [Jasmine](https://jasmine.github.io): (<https://jasmine.github.io>): A BDD framework which can be used for Node and browser testing and which follows Mocha notation
- [Vows](http://vowsjs.org) (<http://vowsjs.org>): A BDD framework for asynchronous testing
- [NodeUnit](https://github.com/caolan/nodeunit) (<https://github.com/caolan/nodeunit>)
- [Jest](https://facebook.github.io/jest) (<https://facebook.github.io/jest>): A framework for *mostly* React and browser testing which is built on Jasmine and has a lot of things included
- [Encyme](http://airbnb.io/enzyme) (<http://airbnb.io/enzyme>): A language *mostly* for React apps which has a jQuery-like syntax and is used with Mocha, Jasmine or other test frameworks
- [Karma](https://karma-runner.github.io/1.0/index.html) (<https://karma-runner.github.io/1.0/index.html>): A testing framework *mostly* for Angular apps
- [TAP](http://www.node-tap.org) (<http://www.node-tap.org/>: A Test-Anything-Protocol library for Node.js which is simpler and ascetic than Mocha or Jasmine

## Understanding Mocha Hooks

 A hook is some logic, typically a function or a few statements. And only you thought we'll be talking about something actually interesting such as pirates...sorry. So this type of a hook is executed when the associated event happens; for example, in Chapter 7 we&#39;ll use hooks to explore the Mongoose library `pre` hooks. Mocha has hooks that are executed in different parts of suites—before the whole suite, before each test, and so on.

In addition to `before` and `beforeEach` hooks, there are `after()`, and `afterEach()` hooks. They can be used to clean up the testing setup, such as database data?

All hooks support asynchronous modes. The same is true for tests as well. For example, the following test suite is synchronous and won&#39;t wait for the response to finish:

```js
  describe('homepage', () => {
    it('should respond to GET', () => {
      superagent
        .get(`http://localhost:${port}`)
        .end((error, response) => {
          expect(response.status).to.equal(200) // This will never happen
      })
    })
  })
```

But, as soon as we add a `done` parameter to the test&#39;s function, our test case waits for the HTTP request to come back. We call `done()` to let Mocha (or Jasmine or Jest since they share this syntax) know that "hey, you can move on, nothing else to assert here". If this `done()` is omitted then the test will timeout because no one will let the test runner/framework know about the finish.

```js
  describe('homepage', () => {
    it('should respond to GET', (done) => {
      superagent
        .get(`http://localhost:${port}`)
        .end((error, response) => {
          expect(response.status).to.equal(200)
          done()
      })
    })
  })
```

Test cases (`describe`) can be nested inside other test cases, and hooks such as `before` and `beforeEach` can be mixed in with different test cases on different levels. Nesting of `describe` constructions is a good idea in large test files.

Sometime, developers might want to skip a test case/suite (`describe.skip()` or `it.skip()`) or make them exclusive (`describe.only()` or `describe.only()`). Exclusivity means that only that particular test runs (the opposite of `skip`).

As an alternative to the BDD interface&#39;s `describe`, `it`, `before`, and others, Mocha supports more traditional TDD interfaces:

- `suite`: analogous to `describe`
- `test`: analogous to `it`
- `setup`: analogous to `before`
- `teardown`: analogous to `after`
- `suiteSetup`: analogous to `beforeEach`
- `suiteTeardown`: analogous to `afterEach`

# TDD with the Assert

Let&#39;s write our first tests with the assert library. This library is part of the Node.js core, which makes it easy to access. It has minimal set of methods, but it might be enough for some cases, such as unit tests... and less is more in some cases, right?

Again, like in the previous project, developers can install Mocha globally or locally. After the Mocha installation is finished, a test file can be created in a `test-example` folder:

```
$ code test-example/test-assert.js
```

**Note**: `code` is a VS Code alias command which allows developers to open a folder in a code editor by executing this command in a terminal. You can use any other editor, such as Sublime Text 3 (`subl`), Vi (`vi`) or TextMate (`mate`) assuming you have these commands configured in your PATH variable or `bash_profile`.

Let's just put some simple test with the following content, maybe test an array method `split()` which creates an array out of a string:

```js
const assert = require('assert')
describe('String#split', () => {
  it('should return an array', () => {
    assert(Array.isArray('a,b,c'.split(',')))
  })
})
```

We can run this simple `test.js` (inside the `test-example` folder), which checks for Array type, with a file name:

```
$ mocha test-assert
```

or

```
$ mocha test-assert.js
```

If you installed Mocha locally (see you package.json and node_modules), then you *might* need to specify the path directly to the local installation because the local installation is not exposed in PATH automatically. This is the command for Linux, macOS and other POSIX systems:

```
$ ./node_modules/.bin/mocha test.js
```

And this is the command for Windows:

```
$ node_modules\.bin\mocha test.js
```

The results of these Mocha commands are shown in Figure 3-2.

![alt](media/image2.png)

***Figure 3-2.** Running Array-type test*

We can add to our example another test case (`it`) that asserts equality of array values (`code/ch3/test-example/test.js`) using a `for` loop and `assert.equal` on individual array items:

```js
const assert = require('assert')
const testArray = ['a','b','c']
const testString = 'a,b,c'

describe('String#split', () => {
  
  it('should return an array', () => {
    assert(Array.isArray('a,b,c'.split(',')))
  })

  it('should return the same array', () => {
    assert.equal(testArray.length, 
      testString.split(',').length, 
      `arrays have equal length`)
    for (let i = 0; i < testArray.length; i++) {
      assert.equal(testArray[i], 
        testString.split(',')[i], 
        `i element is equal`)
    }
  })

})
```

As you can see, some code is repeated, so we can abstract it into `beforeEach` and `before` constructions. A little bit of abstraction is always a good thing! (Abstraction is just a fancy word for cut and paste, a word which software architects like to use to justify a higher wage.)

Here's a new version of the test in which we abstracted away the seed data of the `current` variable. It's in `code/ch3/test-example/test-assert-v2.js`:

```js
var assert = require('assert')
var expected, current

before(() => {
  expected = ['a', 'b', 'c']
})

describe('String#split', () => {

  beforeEach(() => {
    current = 'a,b,c'.split(',')
  })

  it('should return an array', () => {
    assert(Array.isArray(current))
  })

  it('should return the same array', () => {
    assert.equal(expected.length, 
      current.length, 
      'arrays have equal length')
    for (let i = 0; i < expected.length; i++) {
      assert.equal(expected[i], 
        current[i], 
        `i element is equal`)
    }
  })    

})
```

## Chai Assert

In the previous example with `test.js` and assert, we used the Node.js core module assert. At the same time, there's a `chai` library which has assert module (and expect module, and should module). Developers prefer to use chai assert over core assert because chai assert has more features. 

To get started with chai assert, simply replace 

```
const assert = require('assert')
``` 

with 

```
const assert = require('chai').assert
```

Ergo, we can modify our previous example to use chai assert but first of all, we MUST INSTALL chai:

```
$ npm install chai@4.1.2
```

And then import the chai assert with following code which goes in `test-example/test.js`:

```js
const assert = require('chai').assert
```


Or the code which uses destructuring:

```js
const {assert} = require('chai')
```

I mentioned that chai assert has more method than the Node's core assert. That's true. And the following are just some of the methods from the chai assert library:

- `assert(expressions, message)`: throws an error if the expression is false
- `assert.fail(actual, expected, [message], [operator])`: throws an error with values of `actual`, `expected`, and `operator`
- `assert.ok(object, [message])`: throws an error when the object is not double equal (`==`) to true—aka, truthy (0, and an empty string is false in JavaScript/Node.js)
- `assert.notOk(object, [message])`: throws an error when the object is falsy, i.e., false, 0  (zero), ""  (empty string), null, undefined or NaN
- `assert.equal(actual, expected, [message])`: throws an error when `actual` is not double equal (`==`) to `expected`
- `assert.notEqual(actual, expected, [message])`: throws an error when `actual` is double equal (`==`)—in other words, not unequal (`!=`)—to `expected`
- `.strictEqual(actual, expected, [message])`: throws an error when objects are not triple equal (`===`)

Of course there's no need to duplicate the documentation here so for the full chai assert API, refer to [the official documentation](http://chaijs.com/api/assert) (<http://chaijs.com/api/assert>).

**Note**: The chai assert (`chai.assert`) and the Node.js core assert (`assert`) modules are *not 100% compatible*, because the former has more methods. The same is true for chai expect and a standalone expect.js. We will use the Expect from Chai.

# BDD with Expect

Expect is one of the BDD languages. It's very popular because its syntax allows for chaining. It is richer in features than core module assert. Yes, the syntax is very natural to read and understand... even by product managers, designers and chihuahuas. And again, there are at least two flavors of Expect for you how to use choose from:

1. Standalone: Install as a `expect.js` module
2. Chai: Install as a part of the chai library (recommended)

For the former, simply execute the following in an *existing* Node project (must have package.json already there which you can create with `npm init -y`):

```
$ npm install chai@4.1.2 --save-exact
```

Tip: While `install` and `i` are the same, `--save-exact` or `-E` will add a precise version of the library to package.json and not a version with `^` which means install latest up to major (first digit in semantic versioning), a behavior responsible for sleepless nights trying to fix a breaking change in a newer version.

And, then after you installed chai, import it inside a Node.js test file using: 

```js
const expect = require('chai').expect
``` 

 Hey, you can use ES6 destructuring assignment as well. Check this out: 
 
 ```js
 const {expect} = require('chai')
 ``` 
 
 And what about the actual usage of Expect? How to write Expect assertions? Each assert assertion can be re-written with Expect. 
 The idea is to use `expect()` and pass an object we are testing to it as an argument, e.g., `expect(current.length)`. Then use the properties and methods by chaining them in some assemblance of an English language: `expect(current.length).to.equal(3)`.

For example, the previous test can be rewritten in expect's BDD style using `to.be.true`, `equal` and `to.equal`:

```js
const {expect} = require('chai')
let expected
let current

before(() => {
  expected = ['a', 'b', 'c']
})

describe('String#split', () => {
  
  beforeEach(() => {
    current = 'a,b,c'.split(',')
  })

  it('should return an array', () => {
    expect(Array.isArray(current)).to.be.true
  })

  it('should return the same array', () => {
    expect(expected.length).to.equal(current.length)
    for (let i = 0; i < expected.length; i++) {
      expect(expected[i]).equal(current[i])
    }
  })    

})
```

We will cover more of the expect syntax and methods later. Now, I'll show you another library — standalone Expect.js. For the standalone expect.js (not 100% compatible with chai expect) approach, import another module called `expect.js` with the following command:

```
$ npm install expect.js
```

And, replace the chai expect `const {expect} = require('chai')` inside a Node.js test file with the expect.js module:

```js
const expect = require('expect.js')
```

**Note**: `$ npm i expect.js` or any other `$ npm i name` needs to be in the project's root (top-most) folder which must contain either the `node_modules` directory already or a `package.json` file (recommended because you can save the version number in there). For more information on module installations and the ways of npm, please refer to Chapter 1.

## Expect Syntax

The Expect.js library is very extensive. Part of it is that it has nice methods that mimic natural language. Often there are a few ways to write the same assertion, such as `expect(response).to.be(true)` and `expect(response).equal(true)`. The following lists some of the main Expect.js methods/properties:

- `ok`: checks for truthyness
- `true`: checks whether the object is truthy
- `to.be`, `to`: chains methods as in linking two methods
- `not`: chains with a not connotation, such as `expect(false).not.to.be(true)`
- `a`/`an`: checks type (works with `array` as well)
- `include`/`contain`: checks whether an array or string contains an element
- `below`/`above`: checks for the upper and lower limits

**Note**: Again, there is a slight deviation between the standalone `expect.js` module and its Chai counterpart.

I bet you didn't buy this book to read the documentation so we will save you time and not list every single method. Hey, most likely you can get by with just a handful of them such as `equal` and `ok` and `true`. I do. But in case you need the whole list of methods, go to the full documentation on chai expect.js, refer to http://chaijs.com/api/bdd/, and for the standalone, refer to https://github.com/LearnBoost/expect.js/.

# Project: Writing the First BDD Test for Blog

The goal of this mini-project is to add a few tests for Blog (this book&#39;s primary project). We won&#39;t get into headless browsers and UI testing, but we can send a few HTTP requests and parse their responses from the app&#39;s REST end points (see Chapter 2 for a description of the Blog app).

The source code for this chapter is in the `ch3/blog-express` folder of the practicalnode(<https://github.com/azat-co/practicalnode>) GitHub repository (https://github.com/azat-co/practicalnode).

First, let&#39;s copy the Hello World project. It will serve as a foundation for Blog. Then, install Mocha in the Blog project folder, and add it to the `package.json` file at the same time with `$ npm install mocha@4.0.1 --save-dev`. The `--save-dev` flag will categorize this module as a development dependency (devDependencies). Modify this command by replacing package name and version number for expect.js (0.3.1) and [superagent](https://npmjs.org/package/superagent) (<https://npmjs.org/package/superagent>) (3.8.0). The latter is a library to streamline the making of HTTP requests. Alternatives to `superagent` include the following:

- `request`(<https://npmjs.org/package/request>): the third most-starred npm module (as of this writing)
- *core* `http` *module*: clunky and very low level
- `supertest`: a superagent-based assertions library
- `node-fetch`: a port of a native Fetch API from ECMAScript and browsers
- `axios`: a promise and async/await based library which works in Node and browsers (recommended)

Here's the updated `package.json`:

```js
{
  "name": "blog-express",
  "version": "0.0.2",
  "private": true,
  "scripts": {
    "start": "node app.js",
    "test": "mocha tests"
  },
  "dependencies": {
    "express": "4.16.2",
    "pug": "2.0.0-rc.4",
    "stylus": "0.54.5"
  },
  "devDependencies": {
    "expect.js": "0.3.1",
    "mocha": "4.0.1",
    "superagent": "3.8.0"
  }
}
```

Now, create a test folder with `$ mkdir tests` and open `tests/index.js` in your editor. The test needs to start the server. We will use two methods `boot()` and `shutdown()` which are imported from the yet to be created `app.js`. The test is straightforward. It makes a single GET request to a homepage and checks that the response has status code 200 (OK).

```js
const boot = require('../app').boot
const shutdown = require('../app').shutdown
const port = require('../app').port
const superagent = require('superagent')
const expect = require('expect.js')

describe('server', () => {
  before(() => {
    boot()
  })

  describe('homepage', () => {
    it('should respond to GET', (done) => {
      superagent
        .get(`http://localhost:${port}`)
        .end((error, response) => {
          expect(response.status).to.equal(200)
          done()
        })
    })
  })

  after(() => {
    shutdown()
  })
})
```

Now, we will get to the actual meat and potatoes (or rice and tofu bacon for my vegetarian readers) of the Blog project, the Express server in `app.js`. 

Remember, in the test we are using `boot` and `shutdown`. Thus, we expose those two methods, `boot` and `shutdown`, in `app.js` when the file `app.js` is imported by some other file. In our case the importation will be done by the test, i.e., `tests/index.js`. This is so the test can boot the server but so that we can also start the server without tests. 

So, instead of just using `listen()` straight up to launch the server right in the `app.js` like we did before:

```js
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`)
})
```

Let's refactor into using an if/else condition with `require.main === module` which would either export the server Express app object (false) for usage in the Mocha test file (`tests/index.js`) or boot up the server right away (true). We would move the `listen()` into the new `boot()` function which is either called directly or exported to be called by another file.

```js
const server = http.createServer(app)
const boot = () => {
  server.listen(app.get('port'), () => {
    console.info(`Express server listening on port ${app.get('port')}`)
  })
}
const shutdown = () => {
  server.close()
}
if (require.main === module) { 
  boot() // "node app.js" command
} else {
  console.info('Running app as a module')
  exports.boot = boot
  exports.shutdown = shutdown
  exports.port = app.get('port')
}
```

To launch the test, simply run `$ mocha tests` or if that fails a more exact command with the path: `$ ./node_modules/.bin/mocha tests` (POSIX) or  `$ node_modules\.bin\mocha tests` (Win). The `tests` is a folder. The file name `index.js` is optional. If you have more than one file in the `tests` folder, then all of them would be run by the Mocha test runner. When you run the tests, the server should boot and respond to the home page request (`/` route) as shown in Figure 3-3.

![alt](media/image3.png)

***Figure 3-3.** Running $ mocha tests*

So having tests bootup your server is convenient. You don't need to keep remembering to boot up the server separately before running the tests. Can we make the test report prettier? Sure!

## Putting Configs into a Makefile

The `mocha` command accepts many, many, many options. It&#39;s often a good idea to have these options gathered in one place, which could be a Makefile. For example, we can have `test`, `test-w` which test all files in the `test` folder, and have separate commands for just the `module-a.js` and `module-b.js` files to test them separately. We can add any extra flags/options such as reporter, timeout time, watch, growl notification, etc.

```makefile
REPORTER = list
MOCHA_OPTS = --ui tdd --ignore-leaks

test:
        clear
        echo Starting test *********************************************************
        ./node_modules/mocha/bin/mocha \
        --reporter $(REPORTER) \
        $(MOCHA_OPTS) \
        tests/*.js
        echo Ending test

test-w:
        ./node_modules/mocha/bin/mocha \
        --reporter $(REPORTER) \
        --growl \
        --watch \
        $(MOCHA_OPTS) \
        tests/*.js

test-module-a:
        mocha tests/module-a.js --ui tdd --reporter list --ignore-leaks

test-module-b:
        clear
        echo Starting test *********************************************************
        ./node_modules/mocha/bin/mocha \
        --reporter $(REPORTER) \
        $(MOCHA_OPTS) \
        tests/module-b.js
        echo Ending test

.PHONY: test test-w test-module-a test-module-b
```

To launch this Makefile, run `$ make <mode>`. For example, `$ make test` where the `test` command is one of the commands in the Makefile. Other commands are `test-w`, `test-module-a` and `test-module-b`. 

Of course, developers are not limited only to testing in Makefiles. Anything can be there. Mostly the building, compilation, linting, configuration and maybe even deployment! For more information on a Makefile please refer to Understanding Make at http://www.cprogramming.com/tutorial/makefiles.html and Using Make and Writing Makefiles at http://www.cs.swarthmore.edu/~newhall/unixhelp/howto_makefiles.html.

For our Blog app, we can keep the Makefile simple:

```makefile
REPORTER = list
MOCHA_OPTS = --ui bdd –c

test:
    clear
    echo Starting test *********************************************************
    ./node_modules/mocha/bin/mocha \
    --reporter $(REPORTER) \
    $(MOCHA_OPTS) \
    tests/*.js
    echo Ending test

.PHONY: test
```

**Note**: In this Makefile, we point to the local Mocha in the Makefile, so the dependency needs to be added to `package.json` and installed in the `node_modules` folder using `npm i` or `npm i mocha` commands.

Now we can run tests with the `$ make test` command, which allows for more configuration compared with the simple `$ mocha tests` (Figure 3-4).

![alt](media/image4.png)

***Figure 3-4.** Running `make test`*

Don't forget that `make test` uses singular and `mocha tests` uses a plural word in the command. :-)

# Summary

In this chapter, we installed Mocha as a command-line tool and learned its options, we wrote simple tests with assert and the expect.js libraries, and we created the first test for the Blog app by modifying `app.js` to work as a module. In Chapter 10, we harness TravisCI SaaS by writing a `yml` config file and using GitHub to trigger continuous multiple tests in the cloud virtual environments. In the next chapter, we proceed with the essence of a web app that outputs HTML—template engine. We&#39;ll dive deep into Pug and Handlebars, and add pages to Blog.
