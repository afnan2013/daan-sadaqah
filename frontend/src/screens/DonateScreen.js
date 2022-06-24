import React, { Component } from 'react';
import { Row, Col, Button, Card, Image, Form } from 'react-bootstrap';
import {withRouter} from '../components/withRouter'
import Message from '../components/Message';
import Loader from '../components/Loader';
import ScreenContainer from '../components/ScreenContainer';
import { Link } from 'react-router-dom';
import ReadMore from '../components/post/ReadMore';
import {apiCall} from '../utils/apiCall'
import FormContainer from '../components/FormContainer';
import AuthUtil from '../utils/AuthUtil';

class DonateScreen extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          post: {},
          donateAmount: undefined 
        };
      }
  
      setInputValue(property, val) {
        this.setState({
          [property]: val,
        });
      }

  getPostById = async ()=> {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/getPostById',
        payload: {
          p_id: this.props.params.id
        }
      });

      const post = data.returnTables[0][0];

      if(post){
        console.log(post);
        this.setInputValue("post", post);
      }
    } catch (error) {
      
    }
  }

  donateHandler = async (e)=> {
    e.preventDefault();
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/donate',
        payload: {
          p_userid: AuthUtil.getPhone(),
          p_postid: this.state.post.id,
          p_amount: this.state.donateAmount
        }
      });

      const post = data.returnTables[0][0];

      if(post){
        console.log(post);
        this.setInputValue("post", post);
      }
    } catch (error) {
      
    }

  }


  componentDidMount(){
    this.getPostById();
  }
  render() {
    console.log(this.props.params.id)    
    const post = this.state.post;
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
          <>
          <Card key={post.id} className="post_card">
              <Row>
                <Col md={2}>
                  <div className="d-flex py-2">
                    <Image
                      src="/images/passport-sample.jpg"
                      className="post_author_image"
                    ></Image>

                    <div>
                      <h4>Afnan</h4>
                      <p>Mohakhali</p>
                      <p>Dhaka</p>
                    </div>
                  </div>
                </Col>
                <Col md={8}>
                  <Card>
                    <h4>Title: {post.shortTitle}</h4>
                    <ReadMore maxCharacterCount={200}>
                      Story: {post.storyLine}
                    </ReadMore>
                  </Card>
                </Col>
                <Col md={2}>
                  <Link to={`/donate/${post.id}`}>
                  <Button variant="success" className="w-100">
                    Donate
                  </Button>
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <div>Category - {post.categoryname}</div>
                  <div>Amount - {post.fundamount}</div>
                </Col>
                <Col md={8}>
                  <img src="/images/slider-1.jpg" className="form_image" />
                  <img src="/images/slider-2.jpg" className="form_image" />
                  <img src="/images/slider-3.jpg" className="form_image" />
                </Col>
                <Col md={2}>
                  <div className="text-center">

                    <img
                      src={post.sympathized ? this.chekedSympqathyIcon :this.unchekedSympqathyIcon}
                      onClick={() => {
                        this.toggleSympathyIcon(post.id, post.sympathized);
                      }}
                      className="post_author_image"
                    ></img>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <Button className="w-100">100 views</Button>
                </Col>
                <Col>
                  <div className="progress">
                    <div
                      role="progressbar"
                      className="progress-bar"
                      aria-valuenow={post.collectedPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${post.collectedPercentage}%` }}
                    >
                      Collected {post.collectedPercentage}%
                    </div>
                    <p className="text-center w-100" style={{ color: 'white' }}>
                      Need More {100 - post.collectedPercentage}%
                    </p>
                  </div>
                </Col>
                <Col md={2}>
                  <Button className="w-100">Shortlist</Button>
                </Col>
              </Row>
            </Card>
            <FormContainer>
            <Form onSubmit={this.donateHandler}>
              <Form.Group controlId="phone" className="form_field">
                <Form.Control
                  type="text"
                  placeholder="Enter Donate Amount"
                  value={this.state.donateAmount}
                  onChange={(e) => this.setInputValue('donateAmount', e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
            <Button
              type="submit"
              variant="info"
              className="w-100 form_submit_button"
              // onClick={(e) => this.doLogin(e)}
            >
              Donate
            </Button>
          </Form>
            </FormContainer>
            </>
        )}
      </Row>
      </ScreenContainer>
    )
  }

}
  export default withRouter(DonateScreen)
