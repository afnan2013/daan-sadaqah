import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { apiCall } from '../utils/apiCall';
import AuthUtil from '../utils/AuthUtil';
import { withRouter } from '../components/withRouter';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      enable: '',
      loading: false,
      error: undefined,
    };
    this.setInputValue = this.setInputValue.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  checkEnter = (thisEvent) => {
    if (thisEvent.keyCode === 13) {
      this.doLogin(thisEvent);
    }
  };

  resetForm = () => {
    this.setState({
      phone: '',
      password: '',
    });
  };

  doLogin = async (e) => {
    e.preventDefault();

    this.setState({
      enable: 'disable',
      loading: true,
      error: undefined,
    });
    if (!this.state.phone) {
      this.setState({
        enable: '',
        loading: false,
      });
      this.setState({ error: 'Phone field is empty' });
      return;
    }

    if (!this.state.password) {
      this.setState({
        enable: '',
        loading: false,
      });
      this.setState({ error: 'Password field is empty' });
      return;
    }
    // const gwUrl = process.env.REACT_APP_API_GW_HOST;
    try {
      const phone = this.state.phone;
      const password = this.state.password;
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/login',
        payload: { p_userid: phone, p_password: password },
      });
      console.log(data.returnTables);
      if (data.returnTables) {
        const roles = data.returnTables[0];
        const menulist = data.returnTables[1];
        const [user] = data.returnTables[2];
        
        const rolelist = roles.map((role) => role.rolecode);

        console.log(data);
        this.setState({
          enable: '',
          loading: false,
        });
        if (data.token) {
          AuthUtil.setMenu(menulist);
          AuthUtil.setPhone(user.userid);
          AuthUtil.setRole(rolelist);
          AuthUtil.setToken(data.token);
          AuthUtil.setUnreadNotificationCount(10);
          this.props.navigate(this.state.redirect);
        }
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('loading', false);
        this.resetForm();
      }
    } catch (error) {
      this.setState({
        enable: '',
        loading: false,
      });
      this.setState({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
      this.resetForm();
    }
  };

  
  render = () => {
    const redirect = this.props.location.search
      ? this.props.location.search.split('=')[1]
      : '/';
    if (AuthUtil.getToken()) {
      return <Navigate to={redirect} />;
    }

    return (
      <FormContainer>
        <div className="auth_component">
          {this.state.error && (
            <Message variant={'danger'}>{this.state.error}</Message>
          )}
          {this.state.loading && <Loader />}
          <Form onSubmit={this.doLogin}>
            <Form.Group controlId="phone" className="form_field">
              <span className="form_icon">
                <i className="fa-solid fa-phone-flip"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={this.state.phone}
                onChange={(e) => this.setInputValue('phone', e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="form_field">
              <span className="form_icon">
                <i className="fa-solid fa-key"></i>
              </span>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={(e) => this.setInputValue('password', e.target.value)}
                onKeyDown={(e) => this.checkEnter(e)}
                required
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="info"
              className="w-100 form_submit_button"
              // onClick={(e) => this.doLogin(e)}
            >
              Log In
            </Button>
          </Form>
          <Row>
            <Link
              to={
                redirect
                  ? `/forgetpassword?redirect=${redirect}`
                  : '/forgetpassword'
              }
            >
              <span className="common_link_hover">Forgotten password?</span>
            </Link>
          </Row>
        </div>

        <Row className="text-center">
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            <Button
              type="submit"
              variant="success"
              className="new_account_button"
            >
              Create New Account
            </Button>
          </Link>
        </Row>
      </FormContainer>
    );
  };
}

export default withRouter(LoginScreen);
