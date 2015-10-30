var React = require('react');

var HeaderRow = React.createClass({
	render: function() {
		return(
			<tr>
				<td>Question</td>
				<td>Your answer</td>
				<td>Correct answer</td>
				<td>Time (s)</td>
			</tr>
		);
	}
})

module.exports = HeaderRow;