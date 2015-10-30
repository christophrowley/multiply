var React = require('react');

var StartupScreen = React.createClass({
	render: function() {
		return(
			<div className='splash'>
				<form onSubmit={this.startApp}>
					<span>{'Multiply for '}</span>
					<input type='number' onChange={this.onDurationChange} value={this.state.duration / 1000}/>
					<span>{'seconds'}</span>
					<button type='submit'>Go</button>
				</form>
			</div>
		);
	}
})

module.exports = StartupScreen;