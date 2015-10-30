var React = require('react');

var TableRow = React.createClass({
	render: function() {
		var element = this.props.element;
		return(
			<tr>
				<td>{element.factors[0] + ' x ' + element.factors[1]}</td>
				<td>{element.response}</td>
				<td>{element.answer}</td>
				<td>{ ((element.endTime - element.startTime)/1000).toPrecision(2) }</td>
			</tr>
		);
	}
});

module.exports = TableRow;