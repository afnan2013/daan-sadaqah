import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { Nav, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from '../components/withRouter';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Post from '../components/post/Post';
import { apiCall } from '../utils/apiCall';
import AuthUtil from '../utils/AuthUtil';

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: undefined,
      message: '',
      postLists: [],
      postCategoryLists: [],
      filterCategory: undefined,
      filterDistrict: '',
      filterThana: '',
    };
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  getAllOpenPosts = async () => {
    try {

      const searchParams = {
        p_userid: AuthUtil.getPhone()
      };
      if (this.state.filterThana) {
        searchParams.p_thana = this.state.filterThana;
      }

      if (this.state.filterDistrict) {
        searchParams.p_district = this.state.filterDistrict;
      }

      if (this.state.filterCategory) {
        searchParams.p_category = this.state.filterCategory;
      }

      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/getOpenPosts',
        payload: searchParams
      });
    
      if(data.returnTables && data.returnTables[0]){
        this.setInputValue('isLoading', false);
        this.setInputValue('postLists', data.returnTables[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  getPostsCategory = async () => {
    try {
      const { data } = await apiCall({
        method: 'get',
        URL: 'http://www.daansadaqah.com:8443/getPostCategories',
      });
      console.log(data);

      this.setInputValue('postCategoryLists', data.returnTables[0]);
    } catch (err) {
      console.error(err);
    }
  };

  onPostCategoryHandler = (category)=> {
    this.setInputValue('filterCategory', category);
    this.getAllOpenPosts();
  }

  componentDidMount() {
    this.getPostsCategory();
    this.getAllOpenPosts();
  }

  render() {
    return (
      <ScreenContainer>
        <Row>
          <Col md={9}>
            <Nav className="ms-auto">
              {this.state.postCategoryLists &&
                this.state.postCategoryLists.length !== 0 &&
                this.state.postCategoryLists.map((cat) => (
                  <Nav.Link
                    key={cat.id}
                    className="common_inner_nav_link"
                    onClick={() => this.onPostCategoryHandler(cat.code)}
                  >
                    <span>{cat.name}</span>
                  </Nav.Link>
                ))}
            </Nav>
          </Col>
          <Col md={3}>
            <Form
              onSubmit={this.getAllOpenPosts}
              className="d-flex common_search_form"
            >
              <FormControl
                type="search"
                placeholder="Thana"
                aria-label="Thana"
                value={this.state.filterThana}
                onChange={(e) =>
                  this.setInputValue('filterThana', e.target.value)
                }
              />
              <FormControl
                type="search"
                placeholder="District"
                aria-label="District"
                value={this.state.filterDistrict}
                onChange={(e) =>
                  this.setInputValue('filterDistrict', e.target.value)
                }
              />
              <Button variant="outline-success" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </Form>
          </Col>
        </Row>
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
        ) : <>
        {this.state.postLists && this.state.postLists.length !== 0 && (
          <Post posts={this.state.postLists} />
        )}
        </>}
      </ScreenContainer>
    );
  }
}

export default withRouter(PostScreen);
