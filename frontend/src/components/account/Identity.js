import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import AuthUtil from '../../utils/AuthUtil';
import {apiCall} from '../../utils/apiCall';
import { withRouter } from '../withRouter';


class Identity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      profile_pic: '',
      nid_profile_pic: '',
      phone: '',
      nid: '',
      nid_front_page: '',
      nid_back_page: '',
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

  encodeImageFileURL = (event, imageState) => {
    const filesSelect = event.target.files;
    if (filesSelect.length > 0) {
      let selectedFile = filesSelect[0];
      let fileReader = new FileReader();

      fileReader.onload = (FileLoadEvent) => {
        const srcData = FileLoadEvent.target.result;
        this.setInputValue(imageState, srcData);
      };
      fileReader.readAsDataURL(selectedFile);
    }
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
    this.setInputValue('isLoading', true);
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
          this.setInputValue('isLoading', false);
          this.setInputValue('OTPid', data.otpid);
          this.setInputValue('showValidateOTPForm', true);
        } else if (data.status === 'USER1') {
          this.setInputValue('message', 'User Already Exists');
        }
      } catch (err) {
        console.log(err);
        this.setInputValue('isLoading', false);
      }
    } else {
      this.setInputValue('isLoading', false);
      this.setInputValue('message', 'Please Login First');
    }
  }

  submitOTPHandler = async (e)=> {
    e.preventDefault();
    const redirect = "/profile";
    if (!AuthUtil.getToken()) {
      return this.props.navigate(`/login?redirect=${redirect}`);
    }
    this.setInputValue('isLoading', true);
    try {
      const identity = {
        phone: this.state.phone,
        nid: this.state.nid,
        profile_pic: this.state.profile_pic,
        nid_profile_pic: this.state.nid_profile_pic,
        nid_front_page: this.state.nid_front_page,
        nid_back_page: this.state.nid_back_page
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
        const roles = data.returnTables[0];
        const menulist = data.returnTables[1];
        const [user] = data.returnTables[2];

        const rolelist = roles.map((role) => role.rolecode);

        console.log(data);
        this.setState({
          enable: '',
          isLoading: false,
        });
    
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('isLoading', false);
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
          <Form.Group controlId="profile_pic">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Profile Picture</p>
              </Col>
              <Col md={6}>
                {this.state.profile_pic && <img src={this.state.profile_pic} className='form_image'/>}
                <Form.Control
                  type="file"
                  className="form_field"
                  onChange={(event) =>
                    this.encodeImageFileURL(event, 'profile_pic')
                  }
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="seeker_pic">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>
                  Picture per NID (Mandatory for Seeker)**
                </p>
              </Col>
              <Col md={6}>
                {this.state.nid_profile_pic && (
                  <img src={this.state.nid_profile_pic} className='form_image'/>
                )}
                <Form.Control
                  type="file"
                  className="form_field"
                  onChange={(event) =>
                    this.encodeImageFileURL(event, 'nid_profile_pic')
                  }
                ></Form.Control>
              </Col>
              <Col md={3}>
                <span><i className="fa-solid fa-circle-check" style={{color: 'green'}}></i>   OTP Verified</span>
                
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="phone">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Mobile</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  className="form_field"
                  value={this.state.phone}
                  onChange={(e) => this.setInputValue('phone', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                <span><i className="fa-solid fa-circle-check" style={{color: 'green'}}></i>   OTP Verified</span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="nid">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>NID</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  className="form_field"
                  placeholder="Enter NID Number"
                  value={this.state.nid}
                  onChange={(e) => this.setInputValue('nid', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                <span><i className="fa-solid fa-circle-xmark" style={{color: 'red'}}></i>  Not Verified</span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="nid_front_page">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>
                  Copy of NID: JPEG (Front page)
                </p>
              </Col>
              <Col md={6}>
                {this.state.nid_front_page && (
                  <img src={this.state.nid_front_page} className='form_image'/>
                )}
                <Form.Control
                  type="file"
                  className="form_field"
                  onChange={(event) =>
                    this.encodeImageFileURL(event, 'nid_front_page')
                  }
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="nid_back_page">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>
                  Copy of NID: JPEG (Back page)
                </p>
              </Col>
              <Col md={6}>
                {this.state.nid_back_page && (
                  <img src={this.state.nid_back_page} className='form_image'/>
                )}
                <Form.Control
                  type="file"
                  className="form_field"
                  onChange={(event) =>
                    this.encodeImageFileURL(event, 'nid_back_page')
                  }
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
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


export default withRouter(Identity);