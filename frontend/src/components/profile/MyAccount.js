import React, { Component } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Nav } from 'react-bootstrap';
import { withRouter } from '../withRouter';
import AuthUtil from '../../utils/AuthUtil';

class MyAccount extends Component {
  constructor(props) {
    super(props);
  }

  checkLoggedInUser = () => {
    if (!AuthUtil.getToken()) {
      this.props.navigate('/login');
    }
  };

  getProfileSubNavBarDesign = () => {
    let subNavbarDesign = (
      <>
        <Nav className="ms-auto">
          <LinkContainer to={'/profile/myaccount/identity'}>
            <Nav.Link className="common_inner_nav_link">Identity</Nav.Link>
          </LinkContainer>

          <LinkContainer to={'/profile/myaccount/nameandaddress'}>
            <Nav.Link className="common_inner_nav_link">
              Name and Address
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to={'/profile/myaccount/paymentmethod'}>
            <Nav.Link className="common_inner_nav_link">
              Payment Method
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to={'/profile/myaccount/nominee'}>
            <Nav.Link className="common_inner_nav_link">Nominee</Nav.Link>
          </LinkContainer>
        </Nav>
      </>
    );
    return subNavbarDesign;
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
    const subNavbarDesign = this.getProfileSubNavBarDesign();

    return (
      <Row>
        <Col>
          {subNavbarDesign}
          <Outlet />
        </Col>
        <Col md={1}></Col>
      </Row>
    );
  }
}

export default withRouter(MyAccount);
