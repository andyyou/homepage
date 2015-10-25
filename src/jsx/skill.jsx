var React = require('react');
var Well = require('react-bootstrap').Well;
var $ = require('jquery');
var d3 = require('d3');
var wordCloud = require('d3-cloud');

// var gsap = require('gsap');

var skill = React.createClass({

	render: function() {
		return (
			<div id="skill">
			    	<Well bsSize="large">
			    		<h2><span className="glyphicon glyphicon-check"></span> Skill</h2>
			    		<div className="skill_part">
			    			<div id="wordCloud"></div>
			    		</div>
			    		<div className="skill_part">
			    			<div id="chart">

			    			</div>
			    		</div>
			    	</Well>
			</div>
		);
	},

	componentDidMount: function() {

		/***************************************************************
		*
		* D3.js Word Cloud setting
		*
		***************************************************************/

		var wordCloudWidth = $('#wordCloud').width();
		var wordCloudHeight = wordCloudWidth;

		//  drawWordCloud 함수 정의
		function drawWordCloud (wordCloudWidth, wordCloudHeight) {
			// d3 cloud variable
			var fill = d3.scale.category20();									// 20개의 색상 카테고리로 순차 스케일 생성.
			var wordCloudWidth = $('#wordCloud').width();					// wordCloud section 너비 
			var wordCloudHeight = wordCloudWidth;						// wordCloud section 높이
			var canvas = d3.select('#wordCloud').append('svg')				// svg 기본 
					     			.attr('width', wordCloudWidth)
					     			.attr('height', wordCloudHeight)
					     		    .append("g")
					     		      .attr('transform', 'translate(' + wordCloudWidth / 2 + ', ' +  wordCloudHeight / 2 + ')');
			
			// json file data mapping	      
			d3.json("data/data.json", function (data) {

				var lang = data.map(function (d) { return { text: d.language, size: 15 + Math.random() * 50 } });

				// d3-cloud setting
				var layout = wordCloud().size([wordCloudWidth, wordCloudHeight])
							.words(lang)
							.spiral("rectangular")
							.padding(5)
							.font('Impact')
							.fontSize(function (d) { return d.size })
							.on('end', draw);

				// d3-cloud 호출
				layout.start();

			});

			// draw 함수 정의
		     	function draw(words) {
		     		canvas
		     		    	.selectAll('text')
		     		      	.data(words)
		     		    	.enter().append('text')
		     		    		.transition()
		     		    		.delay(function(d,i){
	                              	return i * 50;
	                        	})
		     		    		.duration(2000)
		     		    		.ease('bounce')
			     		      .style('font-size', function (d) { return d.size + 'px'; })
			     		      .style('font-family', 'Impact')
			     		      .style('fill', function (d, i) { return fill(i); })
			     		      .style('text-anchor', 'middle')
			     		      .attr('transform', function (d) {
			     		      	return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			     		      })
			     		      .text(function (d) { return d.text; })
			     		      // .each('end', function (d, i) {
			     		      // 	console.log(d.text, d.size, i);
			     		      // })
			     		      .transition()
			     		      .remove();
			     		      // .each('end', function () {
			     		      // 	console.log('=========');
			     		      // });
		     	}
		}

		// drawWordCloud 호출 after dom is loaded
		drawWordCloud(wordCloudWidth, wordCloudHeight);

		// 10초마다 반복
		setInterval(function (){
			d3.select('#wordCloud').select('svg').remove();
			drawWordCloud(wordCloudWidth, wordCloudHeight);
		}, 10000);

	     	// resizeDrawWordCloud 함수 정의
	     	function resizeDrawWordCloud() {
	     		d3.select('#wordCloud').select('svg').remove();
			drawWordCloud(wordCloudWidth, wordCloudHeight);
		}

		// 해상도에 따라 resizeDrawWordCloud 함수 호
		d3.select(window).on('resize', resizeDrawWordCloud); 

		/***************************************************************
		*
		* D3.js Bar Chart setting
		*
		***************************************************************/





		// var $lang = $('.skill_lang div');
		// var $lang_odd = $('.skill_lang div:odd');
		// var $lang_even = $('.skill_lang div:even');

		// offset the origin on the z-axis to make the spins more interesting.
		// TweenLite.set($lang, {transformOrigin:"center center -150px"});
		
		// pulsate the box using scaleX and scaleY
		// TweenMax.to($lang_odd, 1.2, {scaleX:0.8, scaleY:0.8, force3D:true, yoyo:true, repeat:-1, ease:Power1.easeInOut});
		// TweenMax.to($lang_even, 1.2, {scaleX:1.2, scaleY:1.2, force3D:true, yoyo:true, repeat:-1, ease:Power2.easeInOut});
	}
});

module.exports = skill;