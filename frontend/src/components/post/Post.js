import React from 'react';
import { Card, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReadMore from './ReadMore';
import {withRouter} from '../withRouter'
import AuthUtil from '../../utils/AuthUtil';
import {apiCall} from '../../utils/apiCall'

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sympathyIcon: '',
      isChecked: false,
    };

    this.unchekedSympqathyIcon = '/images/transparent 1-01 (1).png';
    this.chekedSympqathyIcon = '/images/transparent 2-01-01 (1).png';
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  toggleSympathyIcon = async (postid, status) => {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/sympathize',
        payload: {
          p_userid: AuthUtil.getPhone(),
          p_postid: postid
        }
      });
    
		console.log(data);
    } catch (error) {
      
    }
    
  };

  render() {
    const posts = this.props.posts;


    
    return (
      <Row className="account_container">
        {posts &&
          posts.length !== 0 &&
          posts.map((post) => (
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
                  <img src="/images/slider-1.jpg" className="form_image" alt="slider 1"/>
                  <img src="/images/slider-2.jpg" className="form_image" alt="slider 2"/>
                  <img src="/images/slider-3.jpg" className="form_image" alt="slider 3"/>
                </Col>
                <Col md={2}>
                  <div className="text-center">

                    <img
                      src={post.sympathized ? this.chekedSympqathyIcon :this.unchekedSympqathyIcon}
                      onClick={() => {
                        this.toggleSympathyIcon(post.id, post.sympathized);
                      }}
					  alt="sympathize"
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
          ))}
      </Row>
    );
  }
}

export default withRouter(Post);
