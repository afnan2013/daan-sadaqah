import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../../Message';
import Loader from '../../Loader';
import AuthUtil from '../../../utils/AuthUtil';
import { apiCall } from '../../../utils/apiCall';
import { withRouter } from '../../withRouter';

class NameAndAddresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      message: undefined,
      success: undefined,
      isLoading: false,
      nid_name: '',
      nid_address1: '',
      nid_address2: '',
      nid_thana: '',
      nid_district: '',

      name: '',
      status: false,
      address1: '',
      address2: '',
      thana: '',
      district: '',
      road: '',
      sector: '',
      phonenumber: '',
      email: '',
      OTP: '',
      OTPid: '',
      showValidateOTPForm: false,
    };
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  getNameAndAddressData = async () => {
    this.setInputValue('isLoading', false);
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/getContact',
        payload: {
          p_userid: AuthUtil.getPhone(),
        },
        // publicAccess: false,
        // token: AuthUtil.getToken()
      });
      // console.log(data.returnTables);
      const nameandaddress = data.returnTables[0][0];

      if (nameandaddress) {
        // console.log(data);
        this.setInputValue('name', nameandaddress.name);
        this.setInputValue('address1', nameandaddress.address1);
        this.setInputValue('address2', nameandaddress.address2);
        this.setInputValue('email', nameandaddress.email);
        this.setInputValue('phonenumber', nameandaddress.phonenumber);
        this.setInputValue('road', nameandaddress.road);
        this.setInputValue('sector', nameandaddress.sector);
        this.setInputValue('thana', nameandaddress.thana);
        this.setInputValue('district', nameandaddress.district);
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('isLoading', false);
        this.resetForm();
      }
    } catch (error) {
      console.log(error);
      this.setState({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        enable: '',
        isLoading: false,
      });
    }
  };

  sendOTPHandler = async (e) => {
    e.preventDefault();
    // this.setInputValue('showValidateOTPForm', true);
    // return;
    if (AuthUtil.getPhone()) {
      try {
        const { data } = await apiCall({
          method: 'post',
          URL: 'http://www.daansadaqah.com:8443/sendOTP',
          payload: { p_userid: AuthUtil.getPhone() },
        });
        console.log(data);

        if (data.status === 'sent') {
          this.setInputValue('OTPid', data.otpid);
          this.setInputValue('isLoading', false);
          this.setInputValue('showValidateOTPForm', true);
        } else if (data.status === 'TIMES') {
          this.setInputValue('isLoading', false);
          this.setInputValue('message', data.message);
        } else {
          this.setInputValue('isLoading', false);
          this.setInputValue('message', data.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setInputValue('message', 'Please Login First');
    }
  };

  submitOTPHandler = async (e) => {
    e.preventDefault();
    const redirect = '/profile';
    if (!AuthUtil.getToken()) {
      return this.props.navigate(`/login?redirect=${redirect}`);
    }
    this.setInputValue('message', '');
    this.setInputValue('error', '');
    this.setInputValue('isLoading', true);
    try {
      const nameandaddress = {
        p_name: this.state.name,
        p_type: 'NID',
        p_status: this.state.status,
        p_address1: this.state.address1,
        p_address2: this.state.address2,
        p_thana: this.state.thana,
        p_district: this.state.district,
        p_road: this.state.road,
        p_sector: this.state.sector,
        p_phonenumber: this.state.phonenumber,
        p_email: this.state.email,
        p_userid: AuthUtil.getPhone(),
        p_otp: this.state.OTP,
        p_otpid: this.state.OTPid,
      };
      // console.log(nameandaddress);
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/updateContact',
        payload: nameandaddress,
      });
      const result = data.returnTables[0][0];
      console.log(result);
      if (result.message === 'SUCCESS') {
        // console.log(data);
        this.setState({
          enable: '',
          success: 'Information Updated Successfully!',
          isLoading: false,
          showValidateOTPForm: false,
        });
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('isLoading', false);
        this.resetForm();
      }
    } catch (error) {
      console.log(error);
      this.setState({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        enable: '',
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    this.getNameAndAddressData();
  }
  render() {
    return (
      <Row className="account_container">
        {this.state.error && (
          <Message variant={'danger'}>{this.state.error}</Message>
        )}
        {this.state.message && (
          <Message variant={'danger'}>{this.state.message}</Message>
        )}
        {this.state.success && (
          <Message variant={'success'}>{this.state.success}</Message>
        )}
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={this.sendOTPHandler}>
            <Form.Group controlId="name">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Name</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    value={this.state.nid_name}
                    readOnly
                  ></Form.Control>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Address</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    value={this.state.nid_address1}
                    readOnly
                  ></Form.Control>
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    value={this.state.nid_address2}
                    readOnly
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="my-2 form_row">
                <Col md={3}></Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    value={this.state.nid_thana}
                    readOnly
                  ></Form.Control>
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    value={this.state.nid_district}
                    readOnly
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <br />

            <Form.Group controlId="name">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Name</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name as per NID"
                    className="form_field"
                    value={this.state.name}
                    onChange={(e) => this.setInputValue('name', e.target.value)}
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Address</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="Enter Address Line 1 (As per NID)"
                    value={this.state.address1}
                    onChange={(e) =>
                      this.setInputValue('address1', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="Enter Address Line 2 (As per NID)"
                    value={this.state.address2}
                    onChange={(e) =>
                      this.setInputValue('address2', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="my-2 form_row">
                <Col md={3}></Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="Thana (As per NID)"
                    value={this.state.thana}
                    onChange={(e) =>
                      this.setInputValue('thana', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="District (As per NID)"
                    value={this.state.district}
                    onChange={(e) =>
                      this.setInputValue('district', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="phone">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>2nd Mobile</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Enter 2nd phone number"
                    className="form_field"
                    value={this.state.phonenumber}
                    onChange={(e) =>
                      this.setInputValue('phonenumber', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}>
                  <span>
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: 'green' }}
                    ></i>{' '}
                    OTP Verified
                  </span>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="email">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Email</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="form_field"
                    value={this.state.email}
                    onChange={(e) =>
                      this.setInputValue('email', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}>
                  <span>
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: 'green' }}
                    ></i>{' '}
                    OTP Verified
                  </span>
                </Col>
              </Row>
            </Form.Group>
            <Row className="text-center">
              <Button
                type="submit"
                variant="primary"
                className="w-25 my-3 mx-auto"
              >
                Update
              </Button>
            </Row>
          </Form>
        )}

        {this.state.showValidateOTPForm && (
          <Form onSubmit={this.submitOTPHandler}>
            <Form.Group controlId="otp">
              <Row className="my-2 form_row">
                <Col md={3}></Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="Enter OTP"
                    value={this.props.OTP}
                    onChange={(e) => this.setInputValue('OTP', e.target.value)}
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>
            <Row className="text-center">
              <Button
                type="submit"
                variant="success"
                className="w-25 my-3 mx-auto"
              >
                Validate OTP
              </Button>
            </Row>
          </Form>
        )}
      </Row>
    );
  }
}

export default withRouter(NameAndAddresses);
