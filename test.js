var doWhile = require('./');

exports['the-test'] = function (test) {
	var a = [], x = 0;

	doWhile(function (next) {
		a.push(x++);

		return next(x < 4);
	}, function () {
		test.deepEqual(a, [0,1,2,3]);
		test.done();
	});
};
