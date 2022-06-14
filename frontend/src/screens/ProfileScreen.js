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
  }

  checkLoggedInUser = () => {
    if (!AuthUtil.getToken()) {
      this.props.navigate('/login');
    }
  };

  getProfileNavBarDesign = () => {
    let navbarDesign = (
      <>
        <Nav className="ms-auto">
          <LinkContainer to={'/profile/myaccount'}>
            <Nav.Link className="common_inner_nav_link">My Account</Nav.Link>
          </LinkContainer>

          <LinkContainer to={'/profile/myposts'}>
            <Nav.Link className="common_inner_nav_link">
              My Posts History
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to={'/profile/feesanddues'}>
            <Nav.Link className="common_inner_nav_link">Fees and Dues</Nav.Link>
          </LinkContainer>

          <LinkContainer to={'/profile/createpost/rules'}>
            <Nav.Link className="common_inner_nav_link">Create Post</Nav.Link>
          </LinkContainer>
        </Nav>
      </>
    );
    return navbarDesign;
  };

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

    return (
      <ScreenContainer>
        <Row>
          <Col>
            {profileNavbarDesign}
            <Outlet />
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              className="my-3 w-100"
              onClick={() => this.logout()}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </ScreenContainer>
    );
  }
}

export default withRouter(ProfileScreen);
