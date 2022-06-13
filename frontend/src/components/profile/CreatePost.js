import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import AuthUtil from '../../utils/AuthUtil';
import { apiCall } from '../../utils/apiCall';
import { withRouter } from '../withRouter';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      categories: [],
      type: '',
      shortTitle: '',
      storyLine: '',
      image: '',
      video: '',
      status: 'open',
      isVerifies: 'NO',
      message: undefined,
      success: undefined,
      isLoading: false,
      showReviewForm: false,
    };
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  getCategoryData = async () => {
    try {
      this.setInputValue('isLoading', true);
      const { data } = await apiCall({
        method: 'get',
        URL: '/api/postCategories',
        // payload: {
        //   p_userid: AuthUtil.getPhone(),
        // },
      });
      // const categoryData = data.returnTables[0][0];
  
      console.log(data);
      if (data) {
        this.setInputValue('categories', data);
        this.setInputValue('isLoading', false);
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
          this.setInputValue('showValidateOTPForm', true);
        } else {
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

    this.setInputValue('isLoading', true);
    this.setInputValue('message', '');
    this.setInputValue('error', '');
    this.setInputValue('success', '');
    try {
      const nominee = {
        p_userid: AuthUtil.getPhone(),
        p_status: this.state.status,
        p_name: this.state.name,
        p_relationship: this.state.relationship,
        p_address1: this.state.address1,
        p_address2: this.state.address2,
        p_thana: this.state.thana,
        p_district: this.state.district,
        p_road: this.state.road,
        p_sector: this.state.sector,
        p_phonenumber: this.state.nomineePhone,
        p_email: this.state.email,
        p_otp: this.state.OTP,
        p_otpid: this.state.OTPid,
      };
      console.log(nominee);
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/updateNominee',
        payload: nominee,
      });
      const result = data.returnTables[0][0];
      console.log(result);
      if (result.message === 'SUCCESS') {
        // console.log(data);
        this.setState({
          success: 'Information Updated Successfully!',
          isLoading: false,
          showValidateOTPForm: false,
        });
      }else if (result.message === "OTP MISMATCH"){
        this.setInputValue('error', 'Invalid OTP Entered!');
        this.setInputValue('isLoading', false);
      } 
      else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('isLoading', false);
        // this.resetForm();
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
    this.getCategoryData();
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
        {this.state.success && <Message variant={'success'}>{this.state.success}</Message>}
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={this.sendOTPHandler}>
            <Form.Group controlId="name">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Type</p>
                </Col>
                <Col md={6}>
                  <Form.Select
                    className="form_field"
                    value={this.state.type}
                    onChange={(e) => this.setInputValue('type', e.target.value)}
                    required
                  >
                    {this.state.categories.length !== 0 && this.state.categories.map((cat, index)=>(
                       <option key={index} value={cat.categoryCode}>
                       {cat.categoryName}
                     </option>
                    ))}
                   
                  </Form.Select>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="relationship">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Relationship</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder=""
                    className="form_field"
                    value={this.state.relationship}
                    onChange={(e) =>
                      this.setInputValue('relationship', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="address1">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Address</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="Enter Address Line 1"
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
                    placeholder="Enter Address Line 2"
                    value={this.state.address2}
                    onChange={(e) =>
                      this.setInputValue('address2', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="thana">
              <Row className="my-2 form_row">
                <Col md={3}></Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="Thana"
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
                    placeholder="District"
                    value={this.state.district}
                    onChange={(e) =>
                      this.setInputValue('district', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="nomineePhone">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Mobile</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    className="form_field"
                    value={this.state.nomineePhone}
                    onChange={(e) =>
                      this.setInputValue('nomineePhone', e.target.value)
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

export default withRouter(CreatePost);
