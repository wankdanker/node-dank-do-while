// usage:
//
// doWhile(function (next) {
//   doAsyncThing(function (err, result) {
//     //passing truthy to next() will call this anonymous function again
//     //passing falsy to next() will call the done function (if exists)
//     return next(result !== 'done');  
//   });
// }
// , function () {
//   return cb()
// })
//

module.exports = function doWhile (fn, done) {
  run(fn)
  
  function run (fn) {
    process.nextTick(function() {
      fn(function (cont) {
        if (cont) {
          run(fn)
        }
        else if (done) {
          done()
        }
      })
    })
  }
};
