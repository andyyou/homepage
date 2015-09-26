var React = require('react');

var video  = React.createClass({

	render: function() {
		return (
			<div id="video">
				<h1 className="name">Jason</h1>
				<h2 className="title">Front-end & Full-stack Developer</h2>
				<video autoPlay loop muted width="100%">
			   		<source src="video/main_video.mp4" type="video/mp4" />
			 	</video>

			 </div>
		);
	}

});

module.exports = video;