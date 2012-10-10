node-dank-do-while
---------------

An asynchronous do-while-like function for node

install
-------

```bash
npm install dank-do-while
```

method
------

### doWhile(eachFunction, doneFunction);

**eachFunction** will be called once initially and then again
  for each time that `next(truthy)` is called

  Signature is `function(next)`

**doneFuntion** will be called once when `next(falsy)` is called

example
-------

```javascript
var doWhile = require('dank-do-while');

doWhile(function (next) {	
	someAsyncFunction(function (err, result) {
		return next(result !== 'done');
	});
}, function () {
	console.log('done');
});
```
