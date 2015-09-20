var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Logo = require('./logo.jsx');

module.exports = React.createClass({
	
	render: function() {
		return (
			<Navbar id="header" brand={<Logo />} inverse fixedTop toggleNavKey={0}>
				<Nav right eventKey={0}> {/* This is the eventKey referenced */}
				      <NavItem className="gnb" eventKey={1} href="#"><span data-title="Skill">Skill</span></NavItem>
				      <NavItem className="gnb" eventKey={2} href="#"><span data-title="Work">Work</span></NavItem>
				      <NavItem className="gnb" eventKey={3} href="#"><span data-title="SNS">SNS</span></NavItem>
				      <NavItem className="gnb" eventKey={4} href="#"><span data-title="Contact">Contact</span></NavItem>
				</Nav>
			</Navbar>
		);
	}
});