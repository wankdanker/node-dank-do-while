/**
 * A callback based `do while` "loop" that will run the given function until the
 * callback returns a falsy value.
 *
 * @example
 *
 * ```javascript
 * doWhile(function (next) {
 *   doAsyncThing(function (err, result) {
 *     //passing truthy to next() will call this anonymous function again
 *     //passing falsy to next() will call the done function (if exists)
 *     return next(result !== 'done');
 *   });
 * }, function () {
 *  console.log('done');
 * }, 3);
 *
 * @export
 * @param fn - The function to run
 * @param done - The function to run when the loop is done
 * @param concurrent - The number of concurrent functions to run (default 1)
 */
export function doWhile(fn, done, concurrent = 1) {
    let pending = 0;
    let end = false;
    for (let x = 0; x < concurrent; x++) {
        run(fn);
    }
    function run(fn) {
        setTimeout(function () {
            pending += 1;
            fn(function (cont) {
                pending -= 1;
                if (!cont) {
                    end = true;
                }
                if (!end) {
                    run(fn);
                }
                else if (end && pending === 0 && (done != null)) {
                    done();
                }
            });
        });
    }
}
;
