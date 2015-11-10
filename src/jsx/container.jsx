var React = require('react');
var Header = require('./header.jsx');
var Video = require('./video.jsx');
var Skill = require('./skill.jsx');
var Work = require('./work.jsx');

var container = React.createClass({

	render: function() {
		return (
			<div className="content">
				<Header />
				<Video />
				<Skill />
				<Work />
			</div>
		);
	}

});

module.exports = container;