function frequencyCount(arr) {
	return arr.reduce((acc, next) => {
		acc[next] = (acc[next] || 0) + 1;
		return acc;
	}, {});
}

function calcMean(arr) {
	return arr.reduce((total, num) => (total += num), 0) / arr.length;
}

function calcMode(arr) {
	let array = arr.sort((a, b) => a - b);
	let countObj = frequencyCount(array);
	let counter = 0;
	let mostCount;
	for (key in countObj) {
		if (countObj[key] > counter) {
			mostCount = key;
			counter = countObj[key];
		}
	}
	return mostCount;
}

module.exports = { frequencyCount, calcMean, calcMode };
