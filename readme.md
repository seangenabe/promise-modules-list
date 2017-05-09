[![npm](https://img.shields.io/npm/v/promise-modules-list.svg?style=flat-square)](https://www.npmjs.com/package/promise-modules-list)
[![devDependency Status](https://img.shields.io/david/dev/seangenabe/promise-modules-list.svg?style=flat-square)](https://david-dm.org/seangenabe/promise-modules-list#info=devDependencies)

## Format

[![Greenkeeper badge](https://badges.greenkeeper.io/seangenabe/promise-modules-list.svg)](https://greenkeeper.io/)

The list is a single object, in a JSON file, with packages / package-ish strings as keys and their tags as values.

The keys can be:
* package: Just a reference to an npm package.
* package-ish string: A string you pass into `require` which references a JS file inside a package. To distinguish these strings from package strings, just look for a slash `/` character.

```json
{
  "q": [
    "aplus",
    "feature",
    "b",
    "d"
  ]
}
```

```javascript
const promiseModulesList = require('promise-modules-list')
promiseModulesList.q // => ['export', 'a', 'aplus', 'feature', 'b' 'd']
```

Tag order is not significant!

## Tags

### Implementation

Tags according to the claimed implementation by the package.

* **native** - ECMAScript 2015 Promise
* **aplus** - [Promises/A+](https://promisesaplus.com/) by the Promises/A+ organization
* **a** - CommonJS [Promises/A](http://wiki.commonjs.org/wiki/Promises/A)
* **b** - CommonJS [Promises/B](http://wiki.commonjs.org/wiki/Promises/B)
* **d** - CommonJS [Promises/D](http://wiki.commonjs.org/wiki/Promises/D)
* **implementation-unknown** - Implementation unknown

Note: A returns a `promise` function. B and D do not export a `Promise` constructor.

Packages can have more than one of these tags if they implement them (depending on how awesome they are?). For example, many packages are compatible with both A+ and native. They can also be:

* **native-or** - Will return the `Promise` when available in the environment. **Must be first choice** for tag inclusion. That is, if the package might consider the environment `Promise` second to last, it can't have this tag.
* **or-native** - Will fall back to the `Promise` available to the environment. Usually used with packages that search for available `Promise` packages. **Must be last choice** for tag inclusion.
* **danger** - This package mix-and-matches implementations depending on variables / the environment. Use with caution.

### Retrieval method

How to retrieve the Promise from the package, assuming a CommonJS environment.

* **return** - Returns the `Promise` constructor from the package, i.e. `var Promise = require('...')`. Ponyfills fall under this tag. Returns the `promise` function for Promises/A.
* **polyfill** - Polyfills the environment, i.e. `require('...')`
* **export** - Exports a `Promise` constructor from the package, i.e. `var Promise = require('...').Promise`
* **custom-export** - Uses a different export name, i.e. `var Promise = require('...')['...']`.
* **nonstandard** - Does not export a `Promise` constructor at all. 🙁

### Additional features

* **feature** - Adds functionality to either or both the prototype and the constructor `Promise`, in addition to the scope of the main claimed implementation. Trivial methods such as a `polyfill` method or debugging features are not considered.

## Don't be confused when packages mention "native"!

When "native `Promise`" is mentioned, it might mean two things, which aren't necessarily mutually exclusive:
* A `Promise` that implements the ECMAScript 2015 Promise specification.
* The `Promise` in the environment, whether available without prior modifications or polyfilled, i.e. `=== global.Promise`.

Draw on the context to make sure what meaning is intended!

## License

CC0-1.0
