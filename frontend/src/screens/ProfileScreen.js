import React from 'react';
import { Navigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { UPDATE_USER_PROFILE_RESET } from '../constants/userConstants';
import ScreenContainer from '../components/ScreenContainer';
import { withRouter } from '../components/withRouter';
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
    };
  }

  setValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log('Sunmi');
    // dispatch(updateUserProfile('profile', name, email, password));
  };

  componentDidMount() {
    const { userInfo } = this.props.userLogin;
    if (userInfo) {
      this.setValue('name', userInfo.name);
      this.setValue('phone', userInfo.phone);
      this.setValue('email', userInfo.email);
      this.setValue('loggedIn', true);
    }
  }

  render() {
    const { loading, error, userInfo } = this.props.userLogin;
    if (!userInfo) {
      return <Navigate to={'/login'} />;
    }

    return (
      <ScreenContainer>
        <Row>
          <Col md={3}>
            <h1>User Profile</h1>
            {error && <Message variant={'danger'}>{error}</Message>}
            {this.state.message && (
              <Message variant={'danger'}>{this.state.message}</Message>
            )}
            {/* {success && <Message variant={'success'}>Profile Updated!</Message>} */}
            {loading && <Loader />}
            <Form onSubmit={this.submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={this.state.name}
                  onChange={(e) => this.setValue('name', e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={(e) => this.setValue('email', e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter phone"
                  value={this.state.phone}
                  onChange={(e) => this.setValue('phone', e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={(e) => this.setValue('password', e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="my-3">
                Update
              </Button>
            </Form>
          </Col>
          {/* <Col md={9}>
        <h1>My Orders</h1>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant={'danger'}>{errorOrders}</Message>
        ) : orders.length === 0 ? (
          <Message variant={'danger'}>No Orders found</Message>
        ) : (
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button size="sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col> */}
        </Row>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin,
    userDetails: state.userDetails,
  };
};

export default withRouter(connect(mapStateToProps, {})(ProfileScreen));
