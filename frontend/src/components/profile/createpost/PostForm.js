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
      postid: undefined,
      type: '',
      shortTitle: '',
      fundAmount: '',
      fundRaisedAmount: 0,
      storyLine: '',
      postImage: '',
      postVideo: '',
      status: '',
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
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  getFormSubmitDesign = ()=> {
    let submitButton = '';

    if (AuthUtil.getRolePresence(['user']) === true) {
      if (this.state.productid){
        submitButton = (
          <>
          <Button
                type="submit"
                variant="primary"
                className="w-25 my-3 mx-auto"
              >
                  Save
          </Button>
        <Button
          type="submit"
          variant="primary"
          className="w-25 my-3 mx-auto"
            >
              Submit For Review
        </Button>
        </>
        );
      }else{
        submitButton = (
          <Button
                type="submit"
                variant="primary"
                className="w-25 my-3 mx-auto"
              >
                  Create
          </Button>
        );
      } 
    }
    return submitButton;
  }

  getCategoryData = async () => {
    try {
      this.setInputValue('isLoading', true);
      const { data } = await apiCall({
        method: 'get',
        URL: 'http://www.daansadaqah.com:8443/getPostCategories',
        // payload: {
        //   p_userid: AuthUtil.getPhone(),
        // },
      });

      console.log(data);
      if (data && data.returnTables) {
        this.setInputValue('categories', data.returnTables[0]);
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

  submitPostHandler = async (e) => {
    e.preventDefault();

    if (AuthUtil.getPhone()) {
      try {
        const post = {
          p_categoryCode: this.state.type,
          p_shortTitle: this.state.shortTitle,
          p_fundAmount: this.state.fundAmount,
          p_storyLine: this.state.storyLine,
          p_postImage: this.state.postImage,
          p_postVideo: this.state.postVideo, 
          p_postStatus: this.state.status,
          p_userid: AuthUtil.getPhone(),
        };

        // If user reviews post
        if (this.state.isReviewedPost) {
          post.p_postid = this.state.postid;
          post.p_status = 'InApproval';
        }

        console.log(post);
        if (this.state.isReviewedPost) {
          this.props.navigate('/profile/myposts');
        }
        this.setInputValue('isReviewedPost', true);
        const { data } = await apiCall({
          method: 'post',
          URL: 'http://www.daansadaqah.com:8443/savePost',
          payload: post,
        });

        console.log(data);
        // const savedPost = data.returnTables[0][0];
        // if (savedPost) {
        //   this.setInputValue('postid', savedPost.id);
        //   this.setInputValue('isReviewedPost', true);
        // } else {
        //   this.setInputValue('message', data.message);
        // }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setInputValue('message', 'Please Login First');
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
          <Form onSubmit={this.submitPostHandler}>
            {this.state.isReviewedPost && (
              <Form.Group controlId="type">
                <Row className="my-2 form_row">
                  <Col md={3}>
                    <p>Site ID</p>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      className="form_field"
                      value={AuthUtil.getPhone()}
                      required
                      disabled
                    ></Form.Control>
                  </Col>
                  <Col md={3}></Col>
                </Row>
              </Form.Group>
            )}

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
                        <option key={index} value={cat.code}>
                          {cat.name}
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

            <Form.Group controlId="fundAmount">
              <Row className="my-2 form_row">
                <Col md={3}>
                  <p>Fund Amount</p>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Fund Amount"
                    value={this.state.fundAmount}
                    onChange={(e) =>
                      this.setInputValue('fundAmount', e.target.value)
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
                  ? 'Submit For Post Review'
                  : 'Create'}
              </Button>
            </Row>
          </Form>
        )}
      </Row>
    );
  }
}

export default withRouter(PostForm);
