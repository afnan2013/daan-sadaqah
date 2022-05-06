import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar
        className="fixed-top"
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="common_navbar_brand">
              <Image src="/images/Daan-Sadaqah-65x80_PNG.png" fluid></Image>
              <span>DaanSadaqah</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/notification">
                <Nav.Link className="common_nav_items">
                  <i className="fa fa-shopping-cart"></i> <br />
                  <span>Notification</span>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link className="common_nav_items">
                  <i className="fa fa-shopping-cart"></i> <br />
                  <span>Login</span>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link className="common_nav_items">
                  <i className="fa fa-shopping-cart"></i>
                  <NavDropdown title="Menu" id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Menu 1</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Menu 2</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
