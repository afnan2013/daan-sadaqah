import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { withRouter } from '../components/withRouter';
import { register } from '../actions/userActions';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showValidateOTPForm: false,
      showPasswordForm: false,
      phone: '',
      OTP: '',
      password: '',
      confirmPassword: '',
      message: undefined,
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitOTPHandler = this.submitOTPHandler.bind(this);
    this.validateOTPHandler = this.validateOTPHandler.bind(this);
    this.submitPasswordHandler = this.submitPasswordHandler.bind(this);

  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  checkEnter = (thisEvent) => {
    if (thisEvent.keyCode === 13) {
      this.props.login(this.state.phone, this.state.password);
    }
  };

  resetForm = () => {
    this.setState({
      phone: '',
      password: '',
    });
  };

  submitOTPHandler = (e) => {
    e.preventDefault();
    this.setInputValue('showValidateOTPForm', true);
  };

  validateOTPHandler = (e) => {
    e.preventDefault();
    this.setInputValue('showPasswordForm', true);
  };

  submitPasswordHandler = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setInputValue('message', 'Password do not match');
    } else {
      this.props.register(this.state.phone, this.state.password);
    }
  };

  render() {
    const redirect = this.props.location.search
      ? this.props.location.search.split('=')[1]
      : '/';
    const { loading, error, userInfo } = this.props.userRegister;
    if (userInfo) {
      return <Navigate to={redirect} />;
    }

    return (
      <FormContainer>
        <div className="auth_component">
          <h1>Register</h1>
          {error && <Message variant={'danger'}>{error}</Message>}
          {this.state.message && (
            <Message variant={'danger'}>{this.state.message}</Message>
          )}

          {loading && <Loader />}
          <Form onSubmit={this.submitOTPHandler}>
            <Form.Group controlId="phone" className="form_field">
              <span className="form_icon">
                <i className="fa-solid fa-phone-flip"></i>
              </span>
              <Form.Control
                type=""
                placeholder="Enter phone number"
                value={this.state.phone}
                onChange={(e) => this.setInputValue('phone', e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="info"
              className="w-100 form_submit_button"
            >
              Send OTP
            </Button>
          </Form>

          {this.state.showValidateOTPForm && (
            <Form onSubmit={this.validateOTPHandler}>
              <Row>
                <Col>
                  <Form.Group controlId="otp" className="form_field">
                    <span className="form_icon">
                      <i className="fa-solid fa-phone-flip"></i>
                    </span>
                    <Form.Control
                      type=""
                      placeholder="Enter OTP"
                      value={this.props.OTP}
                      onChange={(e) =>
                        this.setInputValue('OTP', e.target.value)
                      }
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    type="submit"
                    variant="warning"
                    className="w-100 form_submit_button"
                  >
                    Validate OTP
                  </Button>
                </Col>
              </Row>
            </Form>
          )}

          {this.state.showPasswordForm && (
            <Form onSubmit={this.submitPasswordHandler}>
              <Form.Group controlId="password" className="form_field">
                <span className="form_icon">
                  <i class="fa-solid fa-key"></i>
                </span>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={this.props.password}
                  onChange={(e) =>
                    this.setInputValue('password', e.target.value)
                  }
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="form_field">
                <span className="form_icon">
                  <i class="fa-solid fa-key"></i>
                </span>
                <Form.Control
                  type="password"
                  placeholder="Enter password again"
                  value={this.props.confirmPassword}
                  onChange={(e) =>
                    this.setInputValue('confirmPassword', e.target.value)
                  }
                  required
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100 form_submit_button"
              >
                Register
              </Button>
            </Form>
          )}

          <Row>
            <Col>
              Already a User?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </Col>
          </Row>
        </div>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRegister: state.userRegister,
  };
};
export default withRouter(
  connect(mapStateToProps, { register })(RegisterScreen)
);
