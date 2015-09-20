var React = require('react');

module.exports  = React.createClass({

	render: function() {
		return (
			<video id="video" autoPlay loop muted width="100%">
			   	<source src="video/main_video.mp4" type="video/mp4" />
			 </video>
		);
	}

});