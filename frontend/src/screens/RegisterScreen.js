import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { withRouter } from '../components/withRouter';
import { register } from '../actions/userActions';
import { apiCall } from '../utils/apiCall';
import AuthUtil from '../utils/AuthUtil';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordForm: false,
      name: '',
      phone: '',
      OTP: '',
      password: '',
      confirmPassword: '',
      message: undefined,
      OTPid: '',
      loading: false,
      error: undefined,
    };

    this.setInputValue = this.setInputValue.bind(this);
    // this.checkEnter = this.checkEnter.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitOTPHandler = this.submitOTPHandler.bind(this);
    this.submitPasswordHandler = this.submitPasswordHandler.bind(this);
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  // checkEnter = (thisEvent) => {
  //   if (thisEvent.keyCode === 13) {
  //     this.props.login(this.state.phone, this.state.password);
  //   }
  // };

  resetForm = () => {
    this.setState({
      phone: '',
      password: '',
    });
  };

  submitOTPHandler = async (e) => {
    e.preventDefault();
    if (this.state.phone) {
      try {
        const { data } = await apiCall({
          method: 'post',
          URL: 'http://www.daansadaqah.com:8443/sendRegOTP',
          payload: { p_userid: this.state.phone },
        });
        console.log(data);

        if (data.status === 'sent') {
          this.setInputValue('OTPid', data.otpid);
          this.setInputValue('showPasswordForm', true);
        } else if (data.status === 'USER1') {
          this.setInputValue('message', 'User Already Exists');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setInputValue('message', 'Please enter your Phone Number');
    }
  };

  submitPasswordHandler = async (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword && !this.props.OTP) {
      this.setInputValue('message', 'Password do not match');
    } else {
      try {
        const { data } = await apiCall({
          method: 'post',
          URL: 'http://www.daansadaqah.com:8443/register',
          payload: {
            p_userid: this.state.phone,
            p_username: this.state.name,
            p_password: this.state.password,
            p_otp: this.state.OTP,
            p_otpid: this.state.OTPid,
          },
        });

        console.log(data.returnTables);
        const validate = data.returnTables[0][0];
        if (validate.status === 'complete') {
          this.props.navigate('/login');
        } else {
          this.setInputValue('message', 'Invalid OTP');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const redirect = this.props.location.search
      ? this.props.location.search.split('=')[1]
      : '/';
    const { loading, error } = this.state;
    if (AuthUtil.getToken()) {
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

          {this.state.showPasswordForm && (
            <Form onSubmit={this.submitPasswordHandler}>
              <Form.Group controlId="otp" className="form_field">
                <span className="form_icon">
                  <i className="fa-solid fa-phone-flip"></i>
                </span>
                <Form.Control
                  type="number"
                  placeholder="Enter OTP"
                  value={this.props.OTP}
                  onChange={(e) => this.setInputValue('OTP', e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="otp" className="form_field">
                <span className="form_icon">
                  <i className="fa-solid fa-user"></i>
                </span>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={this.props.name}
                  onChange={(e) => this.setInputValue('name', e.target.value)}
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
                  value={this.props.password}
                  onChange={(e) =>
                    this.setInputValue('password', e.target.value)
                  }
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="form_field">
                <span className="form_icon">
                  <i className="fa-solid fa-key"></i>
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
