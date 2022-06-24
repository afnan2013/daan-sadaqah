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
    this.getMenu = this.getMenu.bind(this);
    this.getMenuDesign = this.getMenuDesign.bind(this);
  }

  getMenu = async () => {
    this.setState({
      isLoading: true,
    });

    const { data } = await apiCall({
      method: 'post',
      URL: 'http://www.daansadaqah.com:8443/getMenus',
      payload: {},
    });
    console.log(data.returnTables[0]);
    this.setState({
      menuList: data.returnTables[0],
      isLoading: false,
    });
  };

  getMenuDesign = () => {
    if (this.state.isLoading) {
      return <Loader />;
    }

    if (AuthUtil.getRolePresence(['admin']) === true) {
      console.log('Admin Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = (
        <>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {menus.map((menu) => (
              menu !== undefined &&
              menu.menucode !== undefined &&
              menu.menuposition === 'left' &&(
              <LinkContainer key={menu.menucode} to="/">
                <Nav.Link className="common_sidenav_items">
                  <i className={menu.menuicon}></i>
                  <span>{menu.menuname}</span>
                </Nav.Link>
              </LinkContainer>
              )
            ))}
          </Nav>
        </>
      );
      return menuDesign;
    }

    if (AuthUtil.getRolePresence(['developer']) === true) {
      console.log('developer Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = (
        <>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {menus.map((menu) => (
              menu !== undefined &&
              menu.menucode !== undefined &&
              menu.menuposition === 'left' &&(
              <LinkContainer key={menu.menucode} to="/">
                <Nav.Link className="common_sidenav_items">
                  <i className={menu.menuicon}></i>
                  <span>{menu.menuname}</span>
                </Nav.Link>
              </LinkContainer>
              )
            ))}
          </Nav>
        </>
      );
      return menuDesign;
    }

    if (AuthUtil.getRolePresence(['reviewer']) === true) {
      console.log('Admin Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = (
        <>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {menus.map((menu) => (
              menu !== undefined &&
              menu.menucode !== undefined &&
              menu.menuposition === 'left' &&(
              <LinkContainer key={menu.menucode} to={`/${menu.menucode}`}>
                <Nav.Link className="common_sidenav_items">
                  <i className={menu.menuicon}></i>
                  <span>{menu.menuname}</span>
                </Nav.Link>
              </LinkContainer>
              )
            ))}
          </Nav>
        </>
      );
      return menuDesign;
    }

    if (AuthUtil.getRolePresence(['approver']) === true) {
      console.log('Approver Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = (
        <>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {menus.map((menu) => (
              menu !== undefined &&
              menu.menucode !== undefined &&
              menu.menuposition === 'left' &&(
              <LinkContainer key={menu.menucode} to={`/${menu.menucode}`}>
                <Nav.Link className="common_sidenav_items">
                  <i className={menu.menuicon}></i>
                  <span>{menu.menuname}</span>
                </Nav.Link>
              </LinkContainer>
              )
            ))}
          </Nav>
        </>
      );
      return menuDesign;
    }

    if (AuthUtil.getRolePresence(['disburser']) === true) {
      console.log('Admin Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = (
        <>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {menus.map((menu) => (
              menu !== undefined &&
              menu.menucode !== undefined &&
              menu.menuposition === 'left' &&(
              <LinkContainer key={menu.menucode} to={`/${menu.menucode}`}>
                <Nav.Link className="common_sidenav_items">
                  <i className={menu.menuicon}></i>
                  <span>{menu.menuname}</span>
                </Nav.Link>
              </LinkContainer>
              )
            ))}
          </Nav>
        </>
      );
      return menuDesign;
    }

    console.log('Default Menu Populated - ');
    console.log(this.state.menuList);
    return (
      <Nav className="justify-content-end flex-grow-1 pe-3">
        {this.state.menuList &&
          this.state.menuList.map(
            (menu) =>
              menu !== undefined &&
              menu.menucode !== undefined &&
              menu.menuposition === 'left' && (
                <LinkContainer key={menu.menucode} to={menu.menucode}>
                  <Nav.Link className="common_sidenav_items">
                    <i className={menu.menuicon}></i>
                    <span>{menu.menuname}</span>
                  </Nav.Link>
                </LinkContainer>
              )
          )}
      </Nav>
    );
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
        <div className="d-none d-lg-block">
          <NotificationPanel show={this.state.showNotification} />
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
