import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Row, Col, Nav } from 'react-bootstrap';
import Loader from '../components/Loader';
import ScreenContainer from '../components/ScreenContainer';
import { withRouter } from '../components/withRouter';
import AuthUtil from '../utils/AuthUtil';
import { apiCall } from '../utils/apiCall';
import Identity from '../components/account/Identity';
import NameAndAddresses from '../components/account/NameAndAddresses';
import Nominee from '../components/account/Nominee';
import PaymentMethod from '../components/account/PaymentMethod';
// import { getLoggedInUserOrderList } from '../actions/orderActions';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      loggedIn: false,
      message: undefined,
      error: undefined,
      isLoading: false,
      profileNavBar: [],
      subProfileNavBar: [],
      subProfileContent: undefined,
    };

    this.setValue = this.setValue.bind(this);
    this.checkLoggedInUser = this.checkLoggedInUser.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.logout = this.logout.bind(this);
  }

  setValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  checkLoggedInUser = () => {
    if (!AuthUtil.getToken()) {
      this.props.navigate('/login');
    }
  };

  getProfileNavBar = async () => {
    this.setValue('isLoading', true);
    try {
      const { data } = await apiCall({
        method: 'get',
        URL: '/api/profile',
      });
      console.log(data);
      if (data.accountNavBar) {
        this.setValue('profileNavBar', data.accountNavBar);
        this.setValue('isLoading', false);
      }
    } catch (err) {
      console.error(err);
      this.setValue('error', err);
      this.setValue('isLoading', false);
    }
  };

  onSubNavBarHandler = (path) => {
    // console.log(path);
    if (path) {
      this.setValue('subProfileContent', path);
    }
  };

  onNavBarHandler = (path) => {
    // console.log(path);
    if (path) {
      const clickedNavBar = this.state.profileNavBar.filter(
        (nav) => nav.path === path
      );
      // console.log(clickedNavBar[0].subNavBar);
      this.setValue('subProfileNavBar', clickedNavBar[0].subNavBar);
    }
  };

  getProfileNavBarDesign = () => {
    if (this.state.isLoading) {
      return <Loader />;
    }

    let navbarDesign = (
      <>
        <Nav className="ms-auto">
          {this.state.profileNavBar &&
            this.state.profileNavBar.length !== 0 &&
            this.state.profileNavBar.map((navbar) => (
              <Nav.Link
                key={navbar.serial}
                className="common_inner_nav_link"
                onClick={() => this.onNavBarHandler(navbar.path)}
              >
                <span>{navbar.name}</span>
              </Nav.Link>
            ))}
        </Nav>
        <Nav className="ms-auto">
          {this.state.subProfileNavBar &&
            this.state.subProfileNavBar.length !== 0 &&
            this.state.subProfileNavBar.map((navbar) => (
              <Nav.Link
                key={navbar.serial}
                className="common_inner_nav_link"
                onClick={() => this.onSubNavBarHandler(navbar.path)}
              >
                <span>{navbar.name}</span>
              </Nav.Link>
            ))}
        </Nav>
      </>
    );

    return navbarDesign;
  };

  submitHandler = (e) => {
    e.preventDefault();
    // dispatch(updateUserProfile('profile', name, email, password));
  };

  logout = () => {
    AuthUtil.resetTokenDetail();
    this.checkLoggedInUser();
  };

  componentDidMount() {
    if (AuthUtil.getToken()) {
      this.setValue('phone', AuthUtil.getPhone());
      this.setValue('loggedIn', true);
      this.getProfileNavBar();
    }
  }

  render() {
    const redirect = "/profile";
    // const { loading, error } = this.state;
    if (!AuthUtil.getToken()) {
      return <Navigate to={`/login?redirect=${redirect}`}/>;
    }
    const profileNavbarDesign = this.getProfileNavBarDesign();
    const subProfileContent = this.state.subProfileContent;

    return (
      <ScreenContainer>
        <Row>
          <Col>{profileNavbarDesign}</Col>
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

        {subProfileContent === 'identity' ? (
          <Identity />
        ) : subProfileContent === 'nameandaddress' ? (
          <NameAndAddresses />
        ) : subProfileContent === 'nominee' ? (
          <Nominee />
        ) : (
          subProfileContent === 'paymentmethod' && <PaymentMethod />
        )}
      </ScreenContainer>
    );
  }
}

export default withRouter(ProfileScreen);
