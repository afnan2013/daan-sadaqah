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
      notifications: [],
      unreadCount: undefined
    };
    this.getMenu = this.getMenu.bind(this);
    this.getMenuDesign = this.getMenuDesign.bind(this);
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  checkLoggedInUser = () => {
    if (!AuthUtil.getToken()) {
      this.props.navigate('/login');
    }
  };

  logout = ()=> {
    AuthUtil.resetTokenDetail();
  }

  getNotifications = async () => {
    this.setInputValue("isLoading", true);

    const { data } = await apiCall({
      method: 'post',
      URL: 'https://www.daansadaqah.com:8443/getNotificationDaan',
      payload: {
        p_userid: AuthUtil.getPhone(),
      },
    });
    console.log(data.returnTables[0]);
    if(data.returnTables[0]){
      this.setInputValue("isLoading", false);
      this.setInputValue("notifications", data.returnTables[0]);
      this.setInputValue("unreadCount", data.returnTables[1][0].unread)
    }
  };

  getMenu = async () => {
    this.setState({
      isLoading: true,
    });

    const { data } = await apiCall({
      method: 'post',
      URL: 'https://www.daansadaqah.com:8443/getMenus',
      payload: {},
    });
    console.log(data.returnTables[0]);
    this.setState({
      menuList: data.returnTables[0],
      isLoading: false,
    });
  };

  getMenuTemplate = (menus) => {
    const template = (
      <Nav className="justify-content-end flex-grow-1 pe-3">
        {menus.map(
          (menu) =>
            menu !== undefined &&
            menu.menucode !== undefined &&
            menu.menuposition === 'left' && (
              menu.menucode !== 'logout' ?
              <LinkContainer key={menu.menucode} to={menu.menucode}>
                <Nav.Link className="common_sidenav_items">
                  <Row>
                    <Col md={3} className="text-center">
                      <i className={menu.menuicon}></i>
                    </Col>
                    <Col md={9}>
                      <span>{menu.menuname}</span>
                    </Col>
                  </Row>
                </Nav.Link>
              </LinkContainer>
          : <LinkContainer key={menu.menucode} to={'login'}>
            <Nav.Link className="common_sidenav_items" onClick={()=> this.logout()}>
              <Row>
                <Col md={3} className="text-center">
                  <i className={menu.menuicon}></i>
                </Col>
                <Col md={9}>
                  <span>{menu.menuname}</span>
                </Col>
              </Row>
            </Nav.Link>
          </LinkContainer>)
        )}
      </Nav>
    );
    return template;
  };

  getMenuDesign = () => {
    if (this.state.isLoading) {
      return <Loader />;
    }

    if (AuthUtil.getRolePresence(['user']) === true) {
      console.log('User Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = this.getMenuTemplate(menus);
      return menuDesign;
    }

    if (AuthUtil.getRolePresence(['admin']) === true) {
      console.log('Admin Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = this.getMenuTemplate(menus);
      return menuDesign;
    }

    if (AuthUtil.getRolePresence(['developer']) === true) {
      console.log('developer Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = this.getMenuTemplate(menus);
      return menuDesign;
    }

    if (AuthUtil.getRolePresence(['reviewer']) === true) {
      console.log('Admin Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = this.getMenuTemplate(menus);
      return menuDesign;
    }

    if (AuthUtil.getRolePresence(['approver']) === true) {
      console.log('Approver Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = this.getMenuTemplate(menus);
      return menuDesign;
    }

    if (AuthUtil.getRolePresence(['disburser']) === true) {
      console.log('Admin Menu Populated');
      const menus = AuthUtil.getMenu();
      let menuDesign = this.getMenuTemplate(menus);
      return menuDesign;
    }

    console.log('Default Menu Populated - ');
    console.log(this.state.menuList);
    return (<Nav className="justify-content-end flex-grow-1 pe-3">
        {this.state.menuList.map(
          (menu) =>
            menu !== undefined &&
            menu.menucode !== undefined &&
            menu.menuposition === 'left' &&
            menu.open ===1  && (
              <LinkContainer key={menu.menucode} to={menu.menucode}>
                <Nav.Link className="common_sidenav_items">
                  <Row>
                    <Col xs={3} className="text-center">
                      <i className={menu.menuicon}></i>
                    </Col>
                    <Col xs={9}>
                      <span>{menu.menuname}</span>
                    </Col>
                  </Row>
                </Nav.Link>
              </LinkContainer>
            )
        )}
      </Nav>);
  };

  componentDidMount() {
    this.getMenu();
    this.getNotifications();
  }

  // onBlurNotification = (e) => {
  //   this.setState({
  //     showNotification: !this.state.showNotification,
  //   });
  // };

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
                  // onBlur={(e) => this.onBlurOffCanvas(e)}
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      <LinkContainer to="/">
                        <Navbar.Brand className="common_navbar_brand">
                          <Image
                            src="/images/logo_png_5_test.png"
                            fluid
                          ></Image>
                          {/* <span>DaanSadaqah</span> */}
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
                    <Image src="/images/logo_png_5_test.png" fluid></Image>
                    {/* <span>DaanSadaqah</span> */}
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
                    <LinkContainer to="/profile/myaccount/identity">
                      <Nav.Link className="common_nav_items">
                        {AuthUtil.getProfilePic() !== "" ? 
                        <><img
                        src={AuthUtil.getProfilePic()}
                        className="account_profile_avatar"
                        alt="Profile Picture"
                      /></>
                        :<><i className="fa-solid fa-user"></i>
                        <br />
                        <span>Profile</span></> 
                        }
                        
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
                        this.getNotifications()
                        this.setState({
                          showNotification: !this.state.showNotification,
                        });
                      }}
                      // onBlur={(e) => this.onBlurNotification(e)}
                    >
                      <i
                        className="fa-solid fa-bell"
                        style={{ position: 'relative' }}
                      >
                        { (this.state.notifications && this.state.notifications.length !==0 && this.state.unreadCount !== 0) ?
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                          {this.state.unreadCount > 9 ? "9+": this.state.unreadCount}
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      : AuthUtil.getUnreadNotificationCount()!== '0' &&
                      (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                      {AuthUtil.getUnreadNotificationCount() > 9 ? "9+": AuthUtil.getUnreadNotificationCount() }
                      <span className="visually-hidden">
                        unread messages
                      </span>
                    </span>)}
                  
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
          <NotificationPanel
            show={this.state.showNotification}
            notifications={this.state.notifications}
            callback={this.getNotifications}
          />
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
