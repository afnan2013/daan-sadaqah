import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../../Message';
import Loader from '../../Loader';
import AuthUtil from '../../../utils/AuthUtil';
import { apiCall } from '../../../utils/apiCall';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      categories: [],
      rules: [],
      type: '',
      shortTitle: '',
      storyLine: '',
      postImage: '',
      postVideo: '',
      status: 'draft',
      isVerified: 'NO',
      message: undefined,
      success: undefined,
      isLoading: false,
      isReviewedPost: false,
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
        // console.log(srcData);
      };
      fileReader.readAsDataURL(selectedFile);
    }
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

      console.log(data);
      if (data) {
        this.setInputValue('categories', data);
        this.setInputValue('isLoading', false);
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('isLoading', false);
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

  submitReviewHandler = async (e) => {
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

  submitPostHandler = async (e) => {
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
      } else if (result.message === 'OTP MISMATCH') {
        this.setInputValue('error', 'Invalid OTP Entered!');
        this.setInputValue('isLoading', false);
      } else {
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
    console.log(this.state.type);
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
          <Form
            onSubmit={
              this.state.isReviewedPost
                ? this.submitPostHandler
                : this.submitReviewHandler
            }
          >
            <Form.Group controlId="type">
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
                    <option defaultValue>Select Post Type</option>
                    {this.state.categories.length !== 0 &&
                      this.state.categories.map((cat, index) => (
                        <option key={index} value={cat.categoryCode}>
                          {cat.categoryName}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="shortTitle">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Short Title</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Enter a Short Title"
                    className="form_field"
                    value={this.state.shortTitle}
                    onChange={(e) =>
                      this.setInputValue('shortTitle', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="storyLine">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Details</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows="5"
                    placeholder="Enter Story Details (Maximum 500 words)"
                    value={this.state.storyLine}
                    onChange={(e) =>
                      this.setInputValue('storyLine', e.target.value)
                    }
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="postImage">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Image</p>
                </Col>
                <Col md={6}>
                  {this.state.postImage && (
                    <img src={this.state.postImage} className="form_image" />
                  )}
                  <Form.Control
                    type="file"
                    className="form_field"
                    onChange={(event) =>
                      this.encodeImageFileURL(event, 'postImage')
                    }
                  ></Form.Control>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="postVideo">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Video</p>
                </Col>
                <Col md={6}>
                  {this.state.postVideo && (
                    <video width="400px" controls>
                      <source
                        src={this.state.postVideo}
                        type="video/mp4"
                      ></source>
                    </video>
                  )}
                  <Form.Control
                    type="file"
                    className="form_field"
                    onChange={(event) =>
                      this.encodeImageFileURL(event, 'postVideo')
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
                {this.state.isReviewedPost
                  ? 'Proceed To Create Post'
                  : 'Review Post'}
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

export default withRouter(PostForm);
