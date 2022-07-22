import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../../Message';
import Loader from '../../Loader';
import AuthUtil from '../../../utils/AuthUtil';
import { apiCall } from '../../../utils/apiCall';
import { withRouter } from '../../withRouter';

class Identity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      message: undefined,
      success: undefined,
      isLoading: false,
      profile_pic: '',
      nid_profile_pic: '/images/nid_pic.jpg',
      phone: '',
      nid: '',
      nid_front_page: '',
      nid_back_page: '',
      OTP: '',
      OTPid: '',
      verify_status_nid: false,
      verify_status_phone: false,
      showValidateOTPForm: false,
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
        console.log(srcData);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  getIdentityData = async () => {
    // console.log('Fires Identity');
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'https://www.daansadaqah.com:8443/getIdentity',
        payload: {
          p_userid: AuthUtil.getPhone(),
        },
      });
      // console.log(data.returnTables);
      const identity = data.returnTables[0][0];
      console.log(identity);
      if (identity) {
        // console.log('got identity');

        if (identity.profile_pic)
          this.setInputValue(
            'profile_pic',
            String.fromCharCode(...identity.profile_pic.data)
          );
        const nid = this.state.nid;
        if (identity.verify_status_nid)
          this.setInputValue(
            'nid_profile_pic',
            `https://daansadaqah.com:8443/nidpics/${nid}.jpg`
          );
        if (identity.nid_front_page)
          this.setInputValue(
            'nid_front_page',
            String.fromCharCode(...identity.nid_front_page.data)
          );
        if (identity.nid_back_page)
          this.setInputValue(
            'nid_back_page',
            String.fromCharCode(...identity.nid_back_page.data)
          );
        this.setInputValue('verify_status_nid', identity.verify_status_nid);
        this.setInputValue('verify_status_phone', identity.verify_status_phone);
        this.setInputValue('phone', identity.userid);
        this.setInputValue('nid', identity.nid);
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('loading', false);
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
        loading: false,
      });
    }
  };

  sendOTPHandler = async (e) => {
    e.preventDefault();
    this.setInputValue('isLoading', true);
    this.setInputValue('message', '');
    this.setInputValue('error', '');
    // return;
    if (AuthUtil.getPhone()) {
      try {
        const { data } = await apiCall({
          method: 'post',
          URL: 'https://www.daansadaqah.com:8443/sendOTP',
          payload: { p_userid: AuthUtil.getPhone() },
        });
        console.log(data);

        if (data.status === 'sent') {
          this.setInputValue('isLoading', false);
          this.setInputValue('OTPid', data.otpid);
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
        this.setInputValue('isLoading', false);
      }
    } else {
      this.setInputValue('isLoading', false);
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
    try {
      const identity = {
        p_userid: this.state.phone,
        p_profile_pic: this.state.profile_pic,
        p_nid: this.state.nid,
        p_nid_front_page: this.state.nid_front_page,
        p_nid_back_page: this.state.nid_back_page,
        p_otp: this.state.OTP,
        p_otpid: this.state.OTPid,
      };
      // console.log(identity);
      const { data } = await apiCall({
        method: 'post',
        URL: 'https://www.daansadaqah.com:8443/updateIdentity',
        payload: identity,
        // publicAccess: false,
        // token: AuthUtil.getToken()
      });
      const result = data.returnTables[0][0];
      console.log(result);
      if (result.message === 'SUCCESS') {
        // console.log(data.returnTables);
        this.setState({
          enable: '',
          success: 'Information Updated Successful!',
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

  verifyNID = async ()=> {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'https://www.daansadaqah.com:8443/verifyNID',
        payload: { p_userid: AuthUtil.getPhone() },
      });

      if(data){
        this.getIdentityData();
      }
      
    } catch (error) {
      
    }
  }

  verifyPhone = async ()=> {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'https://www.daansadaqah.com:8443/verifyPhone',
        payload: { p_userid: AuthUtil.getPhone() },
      });

      if(data){
        this.getIdentityData();
      }
      
    } catch (error) {
      
    }
  }


  componentDidMount() {
    this.getIdentityData();
  }
  render() {
    return (
      <Row className="account_container">
        {this.state.error && (
          <Message variant={'danger'}>{this.state.error}</Message>
        )}
        {this.state.message && (
          <Message variant={'info'}>{this.state.message}</Message>
        )}
        {this.state.success && (
          <Message variant={'success'}>{this.state.success}</Message>
        )}
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={this.sendOTPHandler}>
            <Form.Group controlId="profile_pic">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Profile Picture</p>
                </Col>
                <Col md={6}>
                  {this.state.profile_pic && (
                    <img src={this.state.profile_pic} className="form_image" alt="profile pic"/>
                  )}
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
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Picture per NID (Mandatory for Seeker)**</p>
                </Col>
                 <Col md={6}>
                  {this.state.nid_profile_pic && (
                    <img
                      src={this.state.nid_profile_pic}
                      className="form_image"
					            alt="NID profile"
                    />
                  )}
                  </Col>
                  <Col md={3}>
                  </Col>
                  
              </Row>
            </Form.Group>

            <Form.Group controlId="phone">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Mobile</p>
                </Col>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    className="form_field"
                    value={this.state.phone}
                    onChange={(e) =>
                      this.setInputValue('phone', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
                {this.state.phone && 
                <Col md={4}>
                  {this.state.verify_status_phone ? (
                    <span>
                      <i
                        className="fa-solid fa-circle-check"
                        style={{ color: 'green' }}
                      ></i>{' '}
                      Verified
                    </span>
                  ) : (
                    <span>
                      <i
                        className="fa-solid fa-circle-xmark"
                        style={{ color: 'red' }}
                      ></i>{' '}
                      Not Verified  
                      <Button onClick={()=> this.verifyPhone()} className='mx-2'>Verify</Button>
                    </span>
                  )}
                </Col>
              }
              </Row>
            </Form.Group>

            <Form.Group controlId="nid">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>NID</p>
                </Col>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="Enter NID Number"
                    value={this.state.nid}
                    onChange={(e) => this.setInputValue('nid', e.target.value)}
                    required
                  ></Form.Control>
                </Col>
                {this.state.nid && 
                <Col md={4}>

                  {this.state.verify_status_nid ? (
                    <span>
                      <i
                        className="fa-solid fa-circle-check"
                        style={{ color: 'green' }}
                      ></i>{' '}
                      Verified
                    </span>
                  ) : (
                    <span>
                      <i
                        className="fa-solid fa-circle-xmark"
                        style={{ color: 'red' }}
                      ></i>{' '}
                      Not Verified
                      <Button onClick={()=> this.verifyNID()} className='mx-2'>Verify</Button>
                    </span>
                    
                  )}
                </Col>
                }
              </Row>
            </Form.Group>

            <Form.Group controlId="nid_front_page">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Copy of NID: JPEG (Front page)</p>
                </Col>
                <Col md={6}>
                  {this.state.nid_front_page && (
                    <img
						alt="nid front page"
                      src={this.state.nid_front_page}
                      className="form_image"
                    />
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
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Copy of NID: JPEG (Back page)</p>
                </Col>
                <Col md={6}>
                  {this.state.nid_back_page && (
                    <img
					alt="nid back page"
                      src={this.state.nid_back_page}
                      className="form_image"
                    />
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

export default withRouter(Identity);
