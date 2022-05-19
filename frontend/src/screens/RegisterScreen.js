import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';

const RegisterScreen = ({ history }) => {
  const [showValidateOTPForm, setValidateOTPForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [OTP, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const location = useLocation();
  const message = undefined;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  // console.log('Just ', userInfo);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitOTPHandler = (e) => {
    e.preventDefault();
    setValidateOTPForm(true);
    // if (password !== confirmPassword) {
    //   setMessage('Password do not match');
    // } else {
    //   dispatch(register(email, password));
    // }
  };

  const validateOTPHandler = (e) => {
    e.preventDefault();
    setShowPasswordForm(true);
  };

  const submitPasswordHandler = (e) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <div className="auth_component">
        <h1>Register</h1>
        {error && <Message variant={'danger'}>{error}</Message>}
        {message && <Message variant={'danger'}>{message}</Message>}

        {loading && <Loader />}
        <Form onSubmit={submitOTPHandler}>
          <Form.Group controlId="phone" className="form_field">
            <span className="form_icon">
              <i class="fa-solid fa-phone-flip"></i>
            </span>
            <Form.Control
              type=""
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

        {showValidateOTPForm && (
          <Form onSubmit={validateOTPHandler}>
            <Row>
              <Col>
                <Form.Group controlId="otp" className="form_field">
                  <span className="form_icon">
                    <i class="fa-solid fa-phone-flip"></i>
                  </span>
                  <Form.Control
                    type=""
                    placeholder="Enter OTP"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
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

        {showPasswordForm && (
          <Form onSubmit={submitPasswordHandler}>
            <Form.Group controlId="password" className="form_field">
              <span className="form_icon">
                <i class="fa-solid fa-key"></i>
              </span>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
};

export default RegisterScreen;
