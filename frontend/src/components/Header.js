import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import AuthUtil from '../utils/AuthUtil';
import {
  Container,
  Image,
  Nav,
  Navbar,
  Offcanvas,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import NotificationPanel from './NotificationPanel';
import { withRouter } from './withRouter';
import Loader from './Loader';
import { apiCall } from '../utils/apiCall';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotification: false,
      isLoading: false,
      menuList: [],
    };
  }

  getMenu = async () => {
    console.log('Component Did Mount : Get Menu Fired');
    this.setState({
      isLoading: true,
    });
    console.log(AuthUtil.getToken());
    if (AuthUtil.getToken()) {
      this.setState({
        menuList: AuthUtil.getMenu(),
        isLoading: false,
      });
    } else {
      const { data } = await apiCall({ method: 'get', URL: '/api/menus' });
      // console.log(data);
      this.setState({
        menuList: data,
        isLoading: false,
      });
    }
  };

  getMenuDesign = () => {
    if (this.state.isLoading) {
      return <Loader />;
    }

    let menuDesign = (
      <>
        {AuthUtil.getRolePresence(['admin']) === true ? (
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {console.log(this.state.menuList)}
            {this.state.menuList?.map((menu) => (
              <LinkContainer key={menu[0]} to="{menu.path}">
                <Nav.Link className="common_sidenav_items">
                  <i className="fa-solid fa-user"></i>
                  <span>{menu[2]}</span>
                </Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
        ) : AuthUtil.getRolePresence(['developer']) === true ? (
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#action1">Developer</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
          </Nav>
        ) : (
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <LinkContainer to="/">
              <Nav.Link className="common_sidenav_items">
                <i class="fa-solid fa-house-chimney"></i>
                <span>Home</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link className="common_sidenav_items">
                <i class="fa-solid fa-house-chimney"></i>
                <span>Posts</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link className="common_sidenav_items">
                <i class="fa-solid fa-house-chimney"></i>
                <span>Discover</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link className="common_sidenav_items">
                <i class="fa-solid fa-house-chimney"></i>
                <span>Shortlist</span>
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/">
              <Nav.Link className="common_sidenav_items">
                <i class="fa-solid fa-house-chimney"></i>
                <span>Training</span>
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/">
              <Nav.Link className="common_sidenav_items">
                <i class="fa-solid fa-house-chimney"></i>
                <span>Rule Book</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        )}
      </>
    );

    return menuDesign;
  };

  componentDidMount() {
    this.getMenu();
  }

  render() {
    const expand = false;
    const menuDesign = this.getMenuDesign();

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
                      <LinkContainer to="/">
                        <Navbar.Brand className="common_navbar_brand">
                          <Image
                            src="/images/Daan-Sadaqah-65x80_PNG.png"
                            fluid
                          ></Image>
                          <span>DaanSadaqah</span>
                        </Navbar.Brand>
                      </LinkContainer>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    {/* Menu */}
                    {menuDesign}
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
                  {AuthUtil.getToken() ? (
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

                  {AuthUtil.getToken() && (
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

export default withRouter(Header);
