var React = require('react');

module.exports = React.createClass({

	doSomething: function() {
		alert('test');
	},
	
	render: function() {
		return (
			<a href="#" className="logo" onClick={this.doSomething}>
				<svg width="70" height="50">
					<circle cx="30" cy="28" r="20" stroke="black" strokeWidth="2"/>
					<text x="22" y="33" fill="#fff">JS</text>
				</svg>
			</a>
		);
	}

});