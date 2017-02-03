'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('main', function (t) {
	t.is((0, _2.default)({ foo: 'bar' }, function (key) {
		return [key, 'unicorn'];
	}).foo, 'unicorn');
	t.is((0, _2.default)({ foo: 'bar' }, function (key, val) {
		return ['unicorn', val];
	}).unicorn, 'bar');
	t.is((0, _2.default)({ foo: 'bar' }, function (key, val) {
		return [val, key];
	}).bar, 'foo');
});

(0, _ava2.default)('target option', function (t) {
	var target = {};
	t.is((0, _2.default)({ foo: 'bar' }, function (key, val) {
		return [val, key];
	}, { target: target }), target);
	t.is(target.bar, 'foo');
});

(0, _ava2.default)('deep option', function (t) {
	var obj = { one: 1, obj: { two: 2, three: 3 }, arr: [{ four: 4 }, 5] };
	var expected = { one: 2, obj: { two: 4, three: 6 }, arr: [{ four: 8 }, 5] };
	var fn = function fn(key, val) {
		return [key, typeof val === 'number' ? val * 2 : val];
	};
	var actual = (0, _2.default)(obj, fn, { deep: true });
	t.deepEqual(actual, expected);
});

(0, _ava2.default)('handles circular references', function (t) {
	var obj = { one: 1, arr: [2] };
	obj.circular = obj;
	obj.arr2 = obj.arr;
	obj.arr.push(obj);

	var fn = function fn(key, val) {
		return [key.toUpperCase(), val];
	};
	var actual = (0, _2.default)(obj, fn, { deep: true });

	var expected = { ONE: 1, ARR: [2] };
	expected.CIRCULAR = expected;
	expected.ARR2 = expected.ARR;
	expected.ARR.push(expected);

	t.deepEqual(actual, expected);
});
