var React = require('react');
var StartupScreen = require('./StartupScreen.jsx');
var TableRow = require('./TableRow.jsx');
var HeaderRow = require('./HeaderRow.jsx');
var utils = require('./utils.js');

var MplyApp = React.createClass({
	getInitialState: function() {
		return ({
			appState: 'splash',
			duration: 30000, // ms
			elapsed: 0,	// ms
			submission: '',
			completed: false,
			questions: []
		});
	},

	generateQuestion: function() {
		// Upper and lower limits on factors
		var uLimit = 12, lLimit = 2;

		var questionsHolder = this.state.questions;
		questionsHolder.push( utils.newQuestion(uLimit,lLimit) );
		this.setState({
			questions: questionsHolder,
			submission: ''
		});
	},

	onAnswerChange: function(e) {
		this.setState({ submission: e.target.value });
	},

	onDurationChange: function(e) {
		this.setState({ duration: e.target.value * 1000 });
	},

	handleAnswerSubmit: function(e) {
		e.preventDefault();

		// Handle current question
		var questionIndex = this.state.questions.length -1;
		var questionState = this.state.questions;
		questionState[ questionIndex ].endTime = Date.now();
		questionState[ questionIndex ].response = this.state.submission;
		if( this.state.submission == questionState[ questionIndex ].answer ) {
			questionState[ questionIndex ].correct = true;
		} else {
			questionState[ questionIndex ].correct = false;
		}
		this.setState({ questions: questionState });

		// New question
		this.generateQuestion();
	},

	startApp: function(e) {
		e.preventDefault();
		this.generateQuestion();
		this.setState({ appState: 'app' });
		console.log( this.state.appState );

		var _this = this;

		var Timer = setInterval( function() {
			var timeBefore = _this.state.elapsed;
			_this.setState({ elapsed: timeBefore + 1000 });
			if( _this.state.elapsed == _this.state.duration ) {
				clearInterval(Timer);
				_this.setState({
					completed: true,
					appState: 'summary'
				});
			}
		}, 1000);
	},

	render: function() {
		switch( this.state.appState ) {
			case 'splash': 
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
			case 'app':
				var currentQuestion = this.state.questions[ this.state.questions.length -1 ];
				return(
					<div className='question'>
						<div id='timer'>{ (this.state.duration - this.state.elapsed)/1000 }</div>
						<span>{ currentQuestion.factors[0] + ' x ' + currentQuestion.factors[1] + ' = '}</span>
						<form onSubmit={this.handleAnswerSubmit}>
							<input type='text' id='answer-box' ref='answer_box' onChange={this.onAnswerChange} value={this.state.submission} />
						</form>
					</div>
				);
			case 'summary':
				var answers = this.state.questions.map( function(element) {
					if( element.hasOwnProperty('response') ){
						return( <TableRow element={element} /> );
					}
				});
				return(
					<table>
						<HeaderRow />
						{answers}
					</table>
				);
		};
	}
});

React.render( <MplyApp />, document.getElementById('app-container') );