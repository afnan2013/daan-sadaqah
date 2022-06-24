import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {withRouter} from '../components/withRouter'
import Message from '../components/Message';
import Loader from '../components/Loader';
import ScreenContainer from '../components/ScreenContainer';

class DonateScreen extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          sympathyIcon: '/images/transparent 1-01 (1).png',
          isChecked: false,
        };
      }
  render() {
    console.log(this.props.params.id)    
    return (
        <ScreenContainer>
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
            <Form.Group controlId="profile_pic">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Profile Picture</p>
                </Col>
                <Col md={6}>
                  {this.state.profile_pic && (
                    <img src={this.state.profile_pic} className="form_image" />
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
                    />
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
                  {/* <span><i className="fa-solid fa-circle-check" style={{color: 'green'}}></i>   OTP Verified</span> */}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="phone">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Mobile</p>
                </Col>
                <Col md={6}>
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
                <Col md={3}>
                  {this.state.verify_status_phone ? (
                    <span>
                      <i
                        className="fa-solid fa-circle-check"
                        style={{ color: 'green' }}
                      ></i>{' '}
                      OTP Verified
                    </span>
                  ) : (
                    <span>
                      <i
                        className="fa-solid fa-circle-xmark"
                        style={{ color: 'red' }}
                      ></i>{' '}
                      Not Verified
                    </span>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="nid">
              <Row className="my-2 form_row">
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
                  {this.state.verify_status_nid ? (
                    <span>
                      <i
                        className="fa-solid fa-circle-check"
                        style={{ color: 'green' }}
                      ></i>{' '}
                      OTP Verified
                    </span>
                  ) : (
                    <span>
                      <i
                        className="fa-solid fa-circle-xmark"
                        style={{ color: 'red' }}
                      ></i>{' '}
                      Not Verified
                    </span>
                  )}
                </Col>
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
      </ScreenContainer>
    )
  }

}
  export default withRouter(DonateScreen)
