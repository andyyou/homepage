var React = require('react');
var Well = require('react-bootstrap').Well;
var $ = require('jquery');
var gsap = require('gsap');

var skill = React.createClass({

	render: function() {
		return (
			<div id="skill">
			    	<Well bsSize="large">
			    		<h2><span className="glyphicon glyphicon-check"></span> Skill</h2>
			    		<div className="skill_lang">
			    			<div className="lang_01">HTML5</div>
			    			<div className="lang_02">CSS3</div>
			    			<div className="lang_03">Javascript</div>
			    			<div className="lang_04">jQuery</div>
			    			<div className="lang_05">AngularJS</div>
			    			<div className="lang_06">ReactJS</div>
			    			<div className="lang_07">NodeJS</div>
			    			<div className="lang_08">ExpressJS</div>
			    			<div className="lang_09">MongoDB</div>
			    			<div className="lang_10">Java</div>
			    			<div className="lang_11">Jsp</div>
			    			<div className="lang_12">Spring</div>
			    			<div className="lang_13">Bootstrap</div>
			    			<div className="lang_14">GruntJS</div>
			    			<div className="lang_15">Ruby</div>
			    			<div className="lang_16">Python</div>
			    			<div className="lang_17">SASS</div>
			    		</div>
			    	</Well>
			</div>
		);
	},

	componentDidMount: function() {

		var $lang = $('.skill_lang div');
		var $lang_odd = $('.skill_lang div:odd');
		var $lang_even = $('.skill_lang div:even');

		//offset the origin on the z-axis to make the spins more interesting.
		TweenLite.set($lang, {transformOrigin:"center center -150px"});
		//pulsate the box using scaleX and scaleY
		TweenMax.to($lang_odd, 1.2, {scaleX:0.8, scaleY:0.8, force3D:true, yoyo:true, repeat:-1, ease:Power1.easeInOut});
		TweenMax.to($lang_even, 1.2, {scaleX:1.2, scaleY:1.2, force3D:true, yoyo:true, repeat:-1, ease:Power2.easeInOut});
	}
});

module.exports = skill;