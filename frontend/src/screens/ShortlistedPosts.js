import React from 'react';
import { Card, Row, Col, Image, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReadMore from '../components/post/ReadMore';
import {withRouter} from '../components/withRouter'
import AuthUtil from '../utils/AuthUtil';
import {apiCall} from '../utils/apiCall';
import ScreenContainer from '../components/ScreenContainer';

class ShortlistedPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sympathyIcon: '',
      isChecked: false,
      shortListedPosts: [],
      selectedAmount: 0,
      donationAmount: undefined
    };

    this.selectedPosts = [];
    this.unchekedSympqathyIcon = '/images/transparent 1-01 (1).png';
    this.chekedSympqathyIcon = '/images/transparent 2-01-01 (1).png';
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }


  editSelectedItems = async (id, amount)=> {
    let previousSelectedAmount = this.state.selectedAmount;
    if(this.selectedPosts.includes(id)){
        this.selectedPosts = this.selectedPosts.filter(x=> x !== id );
        previousSelectedAmount = previousSelectedAmount - amount; 
    }else{
        this.selectedPosts.push(id);
        previousSelectedAmount = previousSelectedAmount + amount;
    }
    this.setInputValue("selectedAmount", previousSelectedAmount);
    console.log(this.selectedPosts);
  }

  getShortlistedPosts = async ()=> {
    try {
        const { data } = await apiCall({
          method: 'post',
          URL: 'https://www.daansadaqah.com:8443/getMyShortlist',
          payload: {
            p_userid: AuthUtil.getPhone()
          }
        });
        
        if(data.returnTables[0]){
          this.setInputValue("shortListedPosts", data.returnTables[0])
        }
      } catch (error) {
        
      }
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
      if(data){
        console.log(data);
      }
      
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
      if(data){
        console.log(data);
      }
      
    } catch (error) {
      
    }
  }

  onDonateHandler = async (e)=> {
    e.preventDefault();

    try {
        let postIDs = '';
        for (let i=0; i< this.selectedPosts.length; i++){
            postIDs += this.selectedPosts[i];
            postIDs+= ','
        }
        postIDs = postIDs.substring(0, postIDs.length - 1)
        console.log(postIDs)
        const { data } = await apiCall({
            method: 'post',
            URL: 'https://www.daansadaqah.com:8443/donatemultiple',
            payload: {
              p_userid: AuthUtil.getPhone(),
              p_amount: this.state.donationAmount,
              p_postids: postIDs
            }
          });
          if(data){
            console.log(data);
          }
        
    } catch (error) {
        
    }
  }

  componentDidMount (){
    this.getShortlistedPosts();
  }
  

  render() {
    const posts = this.state.shortListedPosts;
    
    return (
    <ScreenContainer>

        <Form onSubmit={this.onDonateHandler} className="d-flex common_search_form">

            <FormControl
                type="text"
                placeholder="Selected Sum Amount"
                value={this.state.selectedAmount}
                onChange={(e) => this.setInputValue('selectedAmount', e.target.value)}
                required
            />
            <FormControl
                type="text"
                placeholder="Please enter your donation"
                value={this.state.donationAmount}
                onChange={(e) => this.setInputValue('donationAmount', e.target.value)}
                required
            />

            <Button type="submit" variant="outline-success">
                Donate
            </Button>
        </Form>
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
                      className="post_author_image" alt="sympathize"
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
                  <Button className="w-100" onClick={() => {
                        this.toggleShortList(post.id, post.shortlisted);
                      }}>Shortlist</Button>
                </Col>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={()=> this.editSelectedItems(post.id, post.fundamount)}/>
              </Row>
            </Card>
          ))}
          
      </Row>
      </ScreenContainer>
    );
  }
}

export default withRouter(ShortlistedPosts);
