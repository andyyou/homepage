var React = require('react');
var Header = require('./header.jsx');
var Video = require('./video.jsx');
var Skill = require('./skill.jsx');

var container = React.createClass({

	render: function() {
		return (
			<div className="content">
				<Header />
				<Video />
				<Skill />
			</div>
		);
	}

});

module.exports = container;