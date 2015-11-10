var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var NavBrand = require('react-bootstrap').NavBrand;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var $ = require('jquery'); 

var header = React.createClass({
	
	render: function() {
		return (
			<div id="header">
				<Navbar inverse fixedTop toggleNavKey={0}>
					<NavBrand>
						<a href="#" className="logo">
							<svg width="70" height="50">
								<circle cx="30" cy="25" r="20" stroke="black" strokeWidth="2"/>
								<text x="21" y="30" fill="#fff">JS</text>
							</svg>
						</a>
					</NavBrand>
					<Nav right eventKey={0}> {/* This is the eventKey referenced */}
					      <NavItem className="gnb" eventKey={1} href="#"><span data-title="Skill">Skill</span></NavItem>
					      <NavItem className="gnb" eventKey={2} href="#"><span data-title="Work">Work</span></NavItem>
					      <NavItem className="gnb" eventKey={3} href="#"><span data-title="SNS">SNS</span></NavItem>
					      <NavItem className="gnb" eventKey={4} href="#"><span data-title="Contact">Contact</span></NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	},

	componentDidMount: function() {
		
		// Scroll시 navbar 노출
		$(window).scroll(function() {
			
			var videoHeight = $('#video').height();
			var scrollPosition = $(this).scrollTop();
			var $navbar = $('.navbar-fixed-top');

			if (scrollPosition >= videoHeight - 100) {
				$navbar.addClass('show');
			} else {
				$navbar.removeClass('show');
			}
		});
		// document.addEventListener('scroll', function(e) {

		// 	var videoHeight = e.target.getElementById('video').offsetHeight;			
		// 	var scrollPosition = window.scrollY;
		// 	var testarray = document.getElementsByClassName("navbar-fixed-top");

		// 	function addClass() {
		// 		for(var i = 0; i < testarray.length; i++) {
		// 		    	testarray[i].className += " show";
		// 		    	return true;
		// 		}			
		// 	}

		// 	function removeClass() {
		// 		for(var i = 0; i < testarray.length; i++) {
		// 		    	testarray[i].classList.remove('show');
		// 		}	
		// 	}

		// 	if (scrollPosition >= videoHeight) {
		// 		addClass();
		// 	} else {
		// 		removeClass();
		// 	}

		// 	console.log(videoHeight, scrollPosition);
		// });
	}
});

module.exports = header;