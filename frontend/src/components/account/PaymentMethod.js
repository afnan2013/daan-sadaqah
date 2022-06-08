import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import AuthUtil from '../../utils/AuthUtil';
import {apiCall} from '../../utils/apiCall';
import { withRouter } from '../withRouter';


class Nominee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      name: '',
      address1: '',
      address2: '',
      thana: '',
      district: '',
      nomineePhone: '',
      email: '',
      message: undefined,
      isLoading: false,
      otp: '',
      otpId: '',
      showValidateOTPForm: false
    };
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  getIdentityData = async ()=> {
    try {
      
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/getIdentity',
        payload: {},
        publicAccess: false,
        token: AuthUtil.getToken()
      });
      console.log(data.returnTables);
      if (data.returnTables) {
        

        console.log(data);
        this.setState({
          enable: '',
          loading: false,
        });
    
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('loading', false);
        this.resetForm();
      }
    } catch (error) {
      console.log(error)
      this.setState({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        enable: '',
        loading: false,
      });
    }
  }

  sendOTPHandler = async(e)=> {
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
          this.setInputValue('showValidateOTPForm', true);
        } else if (data.status === 'USER1') {
          this.setInputValue('message', 'User Already Exists');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setInputValue('message', 'Please Login First');
    }
  }

  submitOTPHandler = async (e)=> {
    e.preventDefault();
    const redirect = "/profile";
    if (!AuthUtil.getToken()) {
      return this.props.navigate(`/login?redirect=${redirect}`);
    }

    try {
      const identity = {
        name: this.state.name,
        address1: this.state.address1,
        address2: this.state.address2,
        thana: this.state.thana,
        district: this.state.district,
        nomineePhone: this.state.nomineePhone,
        email: this.state.email,
        phone: AuthUtil.getPhone(),
        otp: this.state.OTP,
        otpid: this.state.OTPid
      }
      console.log(identity);
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/updateIdentity',
        payload: identity,
        publicAccess: false,
        token: AuthUtil.getToken()
      });
      console.log(data.returnTables);
      if (data.returnTables) {
        // const roles = data.returnTables[0];
        // const menulist = data.returnTables[1];
        // const [user] = data.returnTables[2];

        // const rolelist = roles.map((role) => role.rolecode);

        console.log(data);
        this.setState({
          enable: '',
          loading: false,
        });
    
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('loading', false);
        this.resetForm();
      }
    } catch (error) {
      console.log(error)
      this.setState({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        enable: '',
        loading: false,
      });
    }
  }

  componentDidMount(){
    this.getIdentityData();
  }
  render() {
    
    return (
      <Row className='account_container'>
        {this.state.error && (
          <Message variant={'danger'}>{this.state.error}</Message>
        )}
        {this.state.message && (
          <Message variant={'danger'}>{this.state.message}</Message>
        )}
        {/* {success && <Message variant={'success'}>Profile Updated!</Message>} */}
        {this.state.isLoading ? <Loader />: 
        <Form onSubmit={this.sendOTPHandler}>
          <Form.Group controlId="name">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Name</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Full name as per NID"
                  className="form_field"
                  value={this.state.name}
                  onChange={(e) => this.setInputValue('name', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="relationship">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Relationship</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder=""
                  className="form_field"
                  value={this.state.relationship}
                  onChange={(e) => this.setInputValue('relationship', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Address</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  className="form_field"
                  placeholder="Enter Address Line 1"
                  value={this.state.address1}
                  onChange={(e) => this.setInputValue('address1', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="Enter Address Line 2"
                    value={this.state.address2}
                    onChange={(e) => this.setInputValue('address2', e.target.value)}
                    required
                  ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row className='my-2 form_row'>
              <Col md={3}>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  className="form_field"
                  placeholder="Thana"
                  value={this.state.thana}
                  onChange={(e) => this.setInputValue('thana', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="District"
                    value={this.state.district}
                    onChange={(e) => this.setInputValue('district', e.target.value)}
                    required
                  ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="nomineePhone">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Mobile</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  className="form_field"
                  value={this.state.nomineePhone}
                  onChange={(e) => this.setInputValue('nomineePhone', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                <span><i className="fa-solid fa-circle-check" style={{color: 'green'}}></i>   OTP Verified</span>
              </Col>q
            </Row>
          </Form.Group>
          <Form.Group controlId="email">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Email</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="form_field"
                  value={this.state.email}
                  onChange={(e) => this.setInputValue('email', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                <span><i className="fa-solid fa-circle-check" style={{color: 'green'}}></i>   OTP Verified</span>
              </Col>
            </Row>
          </Form.Group>
          <Row className="text-center">
            <Button type="submit" variant="primary" className="w-25 my-3 mx-auto">
              Update
            </Button>
          </Row>
        </Form>}

        {this.state.showValidateOTPForm && (
            <Form onSubmit={this.submitOTPHandler}>
              <Form.Group controlId="otp">
                <Row className='my-2 form_row'>
                <Col md={3}></Col>
                <Col md={6}>
                  <Form.Control
                      type="text"
                      className="form_field"
                      placeholder="Enter OTP"
                      value={this.props.OTP}
                      onChange={(e) =>
                        this.setInputValue('OTP', e.target.value)
                      }
                      required
                    ></Form.Control>
                </Col>
                <Col md={3}></Col>
                </Row>
              </Form.Group>
              <Row className="text-center">
                <Button type="submit" variant="success" className="w-25 my-3 mx-auto">
                  Validate OTP
                </Button>
              </Row>
            </Form>
          )}

      </Row>
    );
  }
}


export default withRouter(Nominee);