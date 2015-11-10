var React = require('react');
var Well = require('react-bootstrap').Well;
var Coverflow = require('react-coverflow');

var work = React.createClass({

	render: function() {
		return (
			<div id="work">
				<Well bsSize="large">
			    		<h2><span className="glyphicon glyphicon-check"></span> Work</h2>
			    		<Coverflow width="960" height="500" displayQuantityOfSide={2} navigation={false}>
					    	<img src='./image/ico/pay_ico.png' alt='title or description' />
					    	
					</Coverflow>
			    		
			    	</Well>
			</div>
		);
	}

});

module.exports = work;