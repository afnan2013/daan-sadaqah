import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row } from 'react-bootstrap';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { withRouter } from '../components/withRouter';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      enable: '',
      redirect: '',
    };
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  checkEnter(thisEvent) {
    if (thisEvent.keyCode === 13) {
      this.props.login(this.state.phone, this.state.password);
    }
  }

  resetForm() {
    this.setState({
      phone: '',
      password: '',
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.login(this.state.phone, this.state.password);
    this.resetForm();
  };

  render() {
    const redirect = this.props.location.search
      ? this.props.location.search.split('=')[1]
      : '/';

    const { loading, error, userInfo } = this.props.userLogin;

    if (userInfo) {
      return <Navigate to={redirect} />;
    }

    return (
      <FormContainer>
        <div className="auth_component">
          {error && <Message variant={'danger'}>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={this.submitHandler}>
            <Form.Group controlId="phone" className="form_field">
              <span className="form_icon">
                <i className="fa-solid fa-phone-flip"></i>
              </span>
              <Form.Control
                type="number"
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
              // onClick={() => this.submitHandler()}
            >
              Log In
            </Button>
          </Form>
          <Row>
            <Link
              to={
                this.state.redirect
                  ? `/register?redirect=${this.state.redirect}`
                  : '/register'
              }
            >
              <span className="common_link_hover">Forgotten password?</span>
            </Link>
          </Row>
        </div>

        <Row className="text-center">
          <Link
            to={
              this.state.redirect
                ? `/register?redirect=${this.state.redirect}`
                : '/register'
            }
          >
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
  }
}

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin,
  };
};

export default withRouter(connect(mapStateToProps, { login })(LoginScreen));
