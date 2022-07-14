import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Row, Col, Nav } from 'react-bootstrap';
import ScreenContainer from '../components/ScreenContainer';
import { withRouter } from '../components/withRouter';
import AuthUtil from '../utils/AuthUtil';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: undefined,
    };
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

  checkIfUser = () => {
    let createPostButton = '';
    if (AuthUtil.getRolePresence(['user']) === true) {
      createPostButton = (
        <LinkContainer to={'/profile/createpost/rules'}>
          <Nav.Link className="common_inner_nav_link">
            <i className="fa-solid fa-plus"></i> Create Post
          </Nav.Link>
        </LinkContainer>
      );
      return createPostButton;
    }
  };

  onChangeProfileMenu = (profileMenu) => {
    this.setInputValue('selectedMenu', profileMenu);
  };

  getProfileNavBarDesign = () => {
    let navbarDesign = (
      <>
        <Nav className="ms-auto" style={{ display: 'block' }}>
          <Row className="profile_menu text-center">
            <Col md={3}>
              <LinkContainer to={'/profile/myaccount/identity'}>
                <Nav.Link
                  className={
                    this.state.selectedMenu === 'myaccount'
                      ? 'common_inner_nav_link active'
                      : 'common_inner_nav_link'
                  }
                  onClick={() => this.onChangeProfileMenu('myaccount')}
                >
                  My Account
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col md={3}>
              <LinkContainer to={'/profile/myposts/lists'}>
                <Nav.Link
                  className={
                    this.state.selectedMenu === 'myposts'
                      ? 'common_inner_nav_link active'
                      : 'common_inner_nav_link'
                  }
                  onClick={() => this.onChangeProfileMenu('myposts')}
                >
                  My Posts History
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col md={3}>
              <LinkContainer to={'/profile/feesanddues'}>
                <Nav.Link
                  className={
                    this.state.selectedMenu === 'feesanddues'
                      ? 'common_inner_nav_link active'
                      : 'common_inner_nav_link'
                  }
                  onClick={() => this.onChangeProfileMenu('feesanddues')}
                >
                  Fees and Dues
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col md={3}>
            <LinkContainer to={'/login'}>
                <Nav.Link
                  className="common_inner_nav_link btn-primary"
                  onClick={() => this.logout()}
                >
                  Logout
                </Nav.Link>
              </LinkContainer>
              
            </Col>
          </Row>
        </Nav>
      </>
    );
    return navbarDesign;
  };

  componentDidMount() {
    const currentPathName = this.props.location.pathname;
    const menu = currentPathName.split('/')[2];
    this.setInputValue('selectedMenu', menu);
  }

  logout = () => {
    AuthUtil.resetTokenDetail();
    this.checkLoggedInUser();
  };

  render() {
    const redirect = '/profile';
    // const { loading, error } = this.state;
    if (!AuthUtil.getToken()) {
      return <Navigate to={`/login?redirect=${redirect}`} />;
    }
    const profileNavbarDesign = this.getProfileNavBarDesign();
    const createPostButton = this.checkIfUser();

    return (
      <ScreenContainer>
        <Row>
          <Col>
            {profileNavbarDesign}
            <Outlet />
          </Col>
          <Col md={2}>
            {createPostButton}
          </Col>
        </Row>
      </ScreenContainer>
    );
  }
}

export default withRouter(ProfileScreen);
