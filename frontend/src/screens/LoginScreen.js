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
        <h1>Sign In</h1>
        {error && <Message variant={'danger'}>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Row>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col sm={2} className="form_icon">
                <Form.Label>
                  <i class="fa-solid fa-phone"></i>
                </Form.Label>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="password">
            <Row>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col sm={2} className="form_icon">
                <Form.Label>
                  <i class="fa-solid fa-phone"></i>
                </Form.Label>
              </Col>
            </Row>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-3">
            Sign In
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
