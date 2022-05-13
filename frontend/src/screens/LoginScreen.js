import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = ({ history }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  // console.log('Just ', userInfo);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <div className="auth_component">
        {error && <Message variant={'danger'}>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
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

          <Button
            type="submit"
            variant="info"
            className="w-100 form_submit_button"
          >
            Log In
          </Button>
        </Form>
        <Row>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
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

export default LoginScreen;
