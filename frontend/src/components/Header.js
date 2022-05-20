import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import {
  Container,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import NotificationPanel from './NotificationPanel';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotification: false,
    };
  }

  render() {
    const expand = false;
    const { userInfo } = this.props.userLogin;

    return (
      <header>
        <Navbar bg="dark" variant="dark" expand={expand} className="fixed-top">
          <Container fluid>
            <Row className="w-100 my-2 align-items-center">
              <Col md={4} className="d-flex">
                <Navbar.Toggle
                  id="common_hamBurger_Icon"
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="start"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      Offcanvas
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="#action1">Home</Nav.Link>
                      <Nav.Link href="#action2">Link</Nav.Link>
                      <NavDropdown
                        title="Dropdown"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item href="#action3">
                          Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                          Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                          Something else here
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                      <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
                <LinkContainer to="/">
                  <Navbar.Brand className="common_navbar_brand">
                    <Image
                      src="/images/Daan-Sadaqah-65x80_PNG.png"
                      fluid
                    ></Image>
                    <span>DaanSadaqah</span>
                  </Navbar.Brand>
                </LinkContainer>
              </Col>

              <Col md={6}>
                <Form className="d-flex common_search_form">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Button>
                </Form>
              </Col>
              <Col md={2} className="d-none d-lg-block">
                <Nav
                  className="ms-auto"
                  style={{ flexDirection: 'row-reverse' }}
                >
                  {userInfo ? (
                    <LinkContainer to="/profile">
                      <Nav.Link className="common_nav_items">
                        <i className="fa-solid fa-user"></i>
                        <br />
                        <span>Profile</span>
                      </Nav.Link>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to="/login">
                      <Nav.Link className="common_nav_items">
                        <i className="fa-solid fa-user"></i>
                        <br />
                        <span>Login</span>
                      </Nav.Link>
                    </LinkContainer>
                  )}

                  {userInfo && (
                    <Nav.Link
                      className="common_nav_items"
                      onClick={() => {
                        this.setState({
                          showNotification: !this.state.showNotification,
                        });
                      }}
                    >
                      <i
                        className="fa-solid fa-bell"
                        style={{ position: 'relative' }}
                      >
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                          9+
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      </i>{' '}
                      <br />
                      <span>Notification</span>
                    </Nav.Link>
                  )}
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar>
        <NotificationPanel show={this.state.showNotification} />
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin,
  };
};
export default connect(mapStateToProps, {})(Header);
