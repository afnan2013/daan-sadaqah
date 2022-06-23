import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { Nav } from 'react-bootstrap';
import { withRouter } from '../components/withRouter';

import Post from '../components/post/Post';
import { apiCall } from '../utils/apiCall';

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postLists: [],
      postCategoryLists: [],
    };

    this.onPostCategoryHandler	= this.onPostCategoryHandler.bind(this)	;
    this.getPostsCategory		= this.getPostsCategory.bind(this)		;
	this.getAllOpenPosts		= this.getAllOpenPosts.bind(this)		;
    this.setInputValue			= this.setInputValue.bind(this)			;
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  getAllOpenPosts = async () => {
    try {
      const { data } = await apiCall({
        method: 'get',
        URL: "http://www.daansadaqah.com:8443/getOpenPosts",
      });
      console.log(data);
      this.setInputValue('postLists', data.returnTables[0]);
    } catch (err) {
      console.error(err);
    }
  };

  onPostCategoryHandler = async (path) => {
    try {
      console.log(`/api${path}`);
      const { data } = await apiCall({
        method: 'get',
        URL: `/api${path}`,
      });
      console.log(data);
      this.setInputValue('postLists', data);
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
        <Nav className="ms-auto">
          <Nav.Link
            className="common_inner_nav_link"
            onClick={() => this.onPostCategoryHandler('/posts')}
          >
            <span>All</span>
          </Nav.Link>

          <Nav.Link
            className="common_inner_nav_link"
            onClick={() => this.onPostCategoryHandler('/posts/newest')}
          >
            <span>Newest</span>
          </Nav.Link>

          <Nav.Link
            className="common_inner_nav_link"
            onClick={() => this.onPostCategoryHandler('/posts/urgent')}
          >
            <span>Urgent</span>
          </Nav.Link>

          {this.state.postCategoryLists &&
            this.state.postCategoryLists.length !== 0 &&
            this.state.postCategoryLists.map((cat) => (
              <Nav.Link
                key={cat.id}
                className="common_inner_nav_link"
                onClick={() =>
                  this.onPostCategoryHandler(`/${cat.postFetchingPath}`)
                }
              >
                <span>{cat.name}</span>
              </Nav.Link>
            ))}
        </Nav>

        {this.state.postLists && this.state.postLists.length !== 0 && (
          <Post posts={this.state.postLists} />
        )}
      </ScreenContainer>
    );
  }
}

export default withRouter(PostScreen);
