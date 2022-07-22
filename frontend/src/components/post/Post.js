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
      isSympathized: this.props.post.sympathized,
      isShortListed: this.props.post.shortlisted
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
        URL: 'https://www.daansadaqah.com:8443/sympathize',
        payload: {
          p_userid: AuthUtil.getPhone(),
          p_postid: postid
        }
      });

      if(data.returnTables[0][0].Messages === "Sympathized"){
        this.setInputValue("isSympathized", true);
      }else if(data.returnTables[0][0].Messages === "Sympathy removed"){
        this.setInputValue("isSympathized", false);
      }
    
		//console.log(data);
    } catch (error) {
      
    }
    
  };

  toggleShortList = async (postid)=> {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'https://www.daansadaqah.com:8443/shortlist',
        payload: {
          p_userid: AuthUtil.getPhone(),
          p_postid: postid
        }
      });

      if(data.returnTables[0][0].Messages === "Shortlisted"){
        this.setInputValue("isShortListed", true);
      }else if(data.returnTables[0][0].Messages === "Shortlist removed"){
        this.setInputValue("isShortListed", false);
      }
      
      
    } catch (error) {
      
    }
  }

  render() {
    const post = this.props.post;
    
    return (
      <Card className="post_card">
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
                src={this.state.isSympathized ? this.chekedSympqathyIcon :this.unchekedSympqathyIcon}
                onClick={() => {
                  this.toggleSympathyIcon(post.id, this.state.isSympathized);
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
            {this.state.isShortListed ? 
            <Button variant="success" className="w-100" onClick={() => {
                  this.toggleShortList(post.id, this.state.isShortListed );
                }}>Shortlisted</Button>
            : <Button className="w-100" onClick={() => {
              this.toggleShortList(post.id, this.state.isShortListed );
            }}>Shortlist</Button>}
          </Col>
        </Row>
      </Card>
         
    );
  }
}

export default withRouter(Post);
