const express = require('express');
const calcFuncs = require('./calcFuncs.js');
const ExpressError = require('./expressError');

const app = express();

app.get('/mean', (req, res, next) => {
	try {
		if (!req.query.numbers) {
			throw new ExpressError(
				'Please enter numbers?= into query string followed by a string of comma seperated numbers',
				400
			);
		}
		let numsStrArr = req.query.numbers.split(',');
		let numArr = numsStrArr.map((x) => Number(x));
		let mean = numArr.reduce((total, num) => (total = total + num), 0) / numArr.length;
		return res.json({ response: { operation: 'mean', value: mean } });
	} catch (err) {
		return next(err);
	}
});

app.get('/median', (req, res, next) => {
	try {
		if (!req.query.numbers) {
			throw new ExpressError(
				'Please enter numbers?= into query string followed by a string of comma seperated numbers',
				400
			);
		}
		let numsStrArr = req.query.numbers.split(',');
		let numArr = numsStrArr.map((x) => parseInt(x));
		let sortNums = numArr.sort((a, b) => a - b);
		let middleIndx = Math.floor(sortNums.length / 2);
		let median;
		if (sortNums.length % 2 === 0) {
			median = (sortNums[middleIndx] + sortNums[middleIndx - 1]) / 2;
		} else {
			median = sortNums[middleIndx];
		}
		return res.json({ response: { operation: 'median', value: median } });
	} catch (err) {
		return next(err);
	}
});

app.get('/mode', (req, res, next) => {
	try {
		if (!req.query.numbers) {
			throw new ExpressError('Please enter numbers into the query string', 404);
		}
		let numsStrArr = req.query.numbers.split(',');
		let numArr = numsStrArr.map((x) => parseInt(x));
		let mode = calcFuncs.calcMode(numArr);
		return res.json({ response: { operation: 'mode', value: mode } });
	} catch (err) {
		return next(err);
	}
});

app.use((req, res, next) => {
	const err = new ExpressError('Invalid URL', 404);
	return next(err);
});

app.use((err, req, res, next) => {
	let message = err.message;
	let status = err.status || 500;
	return res.status(status).send(message);
});

app.listen(3000, () => {
	console.log('Connected at port 3000');
});
