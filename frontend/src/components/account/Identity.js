import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';

export default class Identity extends Component {
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

  render() {
    return (
      <Row className="identityComponent">
        {this.state.error && (
          <Message variant={'danger'}>{this.state.error}</Message>
        )}
        {this.state.message && (
          <Message variant={'danger'}>{this.state.message}</Message>
        )}
        {/* {success && <Message variant={'success'}>Profile Updated!</Message>} */}
        {this.state.isLoading && <Loader />}
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="profile_pic">
            <Row>
              <Col md={3}>
                <span className="form_label">Profile Picture</span>
              </Col>
              <Col md={6}>
                {this.state.profile_pic && <img src={this.state.profile_pic} />}
                <Form.Control
                  type="file"
                  onChange={(event) =>
                    this.encodeImageFileURL(event, 'profile_pic')
                  }
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="seeker_pic">
            <Row>
              <Col md={3}>
                <span className="form_label">
                  Picture per NID (Mandatory for Seeker)**
                </span>
              </Col>
              <Col md={6}>
                {this.state.nid_profile_pic && (
                  <img src={this.state.nid_profile_pic} />
                )}
                <Form.Control
                  type="file"
                  onChange={(event) =>
                    this.encodeImageFileURL(event, 'nid_profile_pic')
                  }
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="phone">
            <Row>
              <Col md={3}>
                <span className="form_label">Mobile</span>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={this.state.phone}
                  onChange={(e) => this.setInputValue('phone', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="nid">
            <Row>
              <Col md={3}>
                <span className="form_label">NID</span>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter NID Number"
                  value={this.state.nid}
                  onChange={(e) => this.setInputValue('nid', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="nid_front_page">
            <Row>
              <Col md={3}>
                <span className="form_label">
                  Copy of NID: JPEG (Front page)
                </span>
              </Col>
              <Col md={6}>
                {this.state.nid_front_page && (
                  <img src={this.state.nid_front_page} />
                )}
                <Form.Control
                  type="file"
                  onChange={(event) =>
                    this.encodeImageFileURL(event, 'nid_front_page')
                  }
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="nid_back_page">
            <Row>
              <Col md={3}>
                <span className="form_label">
                  Copy of NID: JPEG (Back page)
                </span>
              </Col>
              <Col md={6}>
                {this.state.nid_back_page && (
                  <img src={this.state.nid_back_page} />
                )}
                <Form.Control
                  type="file"
                  onChange={(event) =>
                    this.encodeImageFileURL(event, 'nid_back_page')
                  }
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>
        </Form>
      </Row>
    );
  }
}
