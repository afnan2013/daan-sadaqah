import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { Nav, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from '../components/withRouter';

import Post from '../components/post/Post';
import { apiCall } from '../utils/apiCall';
import AuthUtil from '../utils/AuthUtil';

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postLists: [],
      postCategoryLists: [],
      filterCategory: undefined,
      filterDistrict: '',
      filterThana: '',
    };

    this.onPostCategoryHandler = this.onPostCategoryHandler.bind(this);
    this.getPostsCategory = this.getPostsCategory.bind(this);
    this.getAllOpenPosts = this.getAllOpenPosts.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  getAllOpenPosts = async () => {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/getOpenPosts',
        payload: { p_userid: AuthUtil.getPhone() }
      });
      console.log(data);
      this.setInputValue('postLists', data.returnTables[0]);
    } catch (err) {
      console.error(err);
    }
  };

  onPostCategoryHandler = async (category) => {
    try {
      let queryString = '';
      if (category) {
        this.setInputValue('filterCategory', category);
        queryString += `?category=${category}`;
      }
      const { data } = await apiCall({
        method: 'get',
        URL: queryString
          ? `http://www.daansadaqah.com:8443/getOpenPosts${queryString}`
          : 'http://www.daansadaqah.com:8443/getOpenPosts',
      });
      console.log(data);
      this.setInputValue('postLists', data.returnTables[0]);
    } catch (err) {
      console.error(err);
    }
  };

  onPostAddressHandler = async (e) => {
    e.preventDefault();

    let keypairs = [];

    try {
      if (this.state.filterThana) {
        keypairs.push(`thana=${this.state.filterThana}`);
      }

      if (this.state.filterDistrict) {
        keypairs.push(`district=${this.state.filterDistrict}`);
      }

      if (this.state.filterCategory) {
        keypairs.push(`category=${this.state.filterCategory}`);
      }

      let queryString = '';
      for (let i = 0; i < keypairs.length; i++) {
        if (i === 0) {
          queryString += '?' + keypairs[i];
        } else {
          queryString += '&' + keypairs[i];
        }
      }

      const { data } = await apiCall({
        method: 'get',
        URL: `http://www.daansadaqah.com:8443/getOpenPosts${queryString}`,
      });
      console.log(data);
      this.setInputValue('postLists', data.returnTables[0]);
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
              onSubmit={this.onPostAddressHandler}
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
        {this.state.postLists && this.state.postLists.length !== 0 && (
          <Post posts={this.state.postLists} />
        )}
      </ScreenContainer>
    );
  }
}

export default withRouter(PostScreen);
