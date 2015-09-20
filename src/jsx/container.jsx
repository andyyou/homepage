var React = require('react');
var Header = require('./header.jsx');
var Video = require('./video.jsx');
var Skill = require('./skill.jsx');

module.exports = React.createClass({

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