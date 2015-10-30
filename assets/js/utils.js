var utils = {
	newQuestion: function( lLimit, uLimit ) {
		var factors = [ 
			Math.floor(Math.random() * (uLimit - lLimit)) + lLimit,
			Math.floor(Math.random() * (uLimit - lLimit)) + lLimit
		];
		var answer = factors[0] * factors[1];
		var startTime = Date.now();
		return({
			factors: factors,
			answer: answer,
			startTime: startTime
		});
	}
}

module.exports = utils;