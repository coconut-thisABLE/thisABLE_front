import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logoimg from "../../assets/images/logo.svg";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="nav-div">
      <Navbar className="navBar">
        <Nav className="nav-logo-container" href="/">
          <img className="logoimg" alt="logo" src={logoimg}></img>
        </Nav>
        <Nav className="nav-button">
          <Nav.Link href="/" media="screen and (min-width:768px) and (max-width: 1042px)" className="webnav">지도 보기</Nav.Link>
          <Nav.Link href="/" media="screen and (min-width:768px) and (max-width: 1042px)" className="webnav">리스트 보기</Nav.Link>
          <Nav.Link href="/" media="screen and (min-width:0px) and (max-width: 768px)" className="mobilenav">지도 보기</Nav.Link>
          <Nav.Link href="/list" media="screen and (min-width:0px) and (max-width: 768px)" className="mobilenav">리스트 보기</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
