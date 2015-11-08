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
			    			<div id="barChart">

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
			d3.json("data/wordCloud.json", function (data) {

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
		}, 8000);

	     	// resizeDrawWordCloud 함수 정의
	     	function resizeDrawWordCloud() {
	     		d3.select('#wordCloud').select('svg').remove();
			drawWordCloud(wordCloudWidth, wordCloudHeight);
		}

		// 해상도에 따라 resizeDrawWordCloud 함수 호출
		d3.select(window).on('resize', resizeDrawWordCloud); 

		/***************************************************************
		*
		* D3.js Bar Chart setting
		*
		***************************************************************/
		var margin = { top: 10, right: 10, bottom: 60, left: 40},
			barChartWidth = $('#barChart').width() - margin.right - margin.left;
			barChartHeight = $('#barChart').height() - margin.top - margin.bottom;

		// drawBarChart 함수 정의
		function drawBarChart (barChartWidth, barChartHeight) {
			var margin = { top: 10, right: 10, bottom: 60, left: 40},
			barChartWidth = $('#barChart').width() - margin.right - margin.left;
			barChartHeight = $('#barChart').height() - margin.top - margin.bottom;

			// Define canvas 
			var canvas = d3.select('#barChart')
								.append('svg')
									.attr({
										'width' : barChartWidth + margin.right + margin.left,
										'height' : barChartHeight + margin.top + margin.bottom
									})
								.append('g')
									.attr('transform', 'translate(' + margin.left + ', ' + margin.right + ')');

			// Define the x y scales
			var xScale = d3.scale.ordinal()
							.rangeRoundBands([0, barChartWidth], 0.2, 0.2);

			var yScale = d3.scale.linear()
							.range([barChartHeight, 0]);

			// Define axis
			var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient('bottom');

			var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient('left')
						.tickFormat(function (d) {
							return d + '%';
						});

			// barChart data mapping
			d3.json("data/barChart.json", function (error, data) {

				if (error) console.log('Error: data not loaded');

				data.forEach(function (d) {
					d.percent = +d.percent;
					d.language = d.language;

					console.log(d.percent);
				});

				data.sort(function (a, b) {
					return b.percent - a.percent;
				});

				xScale.domain(data.map(function (d) { return d.language; }) );
				yScale.domain([0, 100]);

				canvas.selectAll('rect')
					.data(data)
					.enter()
					.append('rect')
					.attr('height', 0)
					.attr('y', barChartHeight)
					.attr('rx', '15px')
					.transition().duration(3000)
					.delay(function (d, i) { return i * 200 })
					.attr({
						'x': function (d) { return xScale(d.language); },
						'y': function (d) { return yScale(d.percent); },
						'width': xScale.rangeBand(),
						'height': function (d) { return barChartHeight - yScale(d.percent); }
					})
					.style('fill', function (d, i) { return 'rgb(46, 215, ' + ((i * 30) + 100) + ')' });

				canvas.selectAll('text')
						.data(data)
						.enter()
						.append('text')
						.text(function(d) { return d.percent; })
						.attr('x', function(d) { return xScale(d.language) + xScale.rangeBand() / 2; })
						.attr('y', function(d) { return yScale(d.percent) + 17; })
						.style('fill', 'white')
						.style('text-anchor', 'middle');


				canvas.append('g')
						.attr('class', 'x axis')
						.attr('transform', 'translate(0, ' + barChartHeight + ')')
						.call(xAxis)
						.selectAll('text')
						.attr('transform', 'rotate(-60)')
						.attr('dx', '-.8em')
						.attr('dy', '-.25em')
						.style('fill', '#F7B9D9')
						.style('text-anchor', 'end');

				canvas.append('g')
						.attr('class', 'y axis')
						.call(yAxis)
						.style('fill', '#F7B9D9');

			});
		}

		// drawBarChart 호출 after dom is loaded
		drawBarChart(barChartWidth, barChartHeight);

		// resizeDrawWordCloud 함수 정의
	     	function resizeDrawBarChart() {
	     		d3.select('#barChart').select('svg').remove();
			drawBarChart(barChartWidth, barChartHeight);
		}

		// 해상도에 따라 resizeDrawBarChart 함수 호출
		d3.select(window).on('resize', resizeDrawBarChart); 

		


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