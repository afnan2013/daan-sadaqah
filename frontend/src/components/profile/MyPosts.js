import React, { Component } from 'react';
import { withRouter } from '../withRouter';
import {Table, Row, Button} from 'react-bootstrap';
import {apiCall} from '../../utils/apiCall'

class MyPosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      error:undefined,
      message: undefined,
      posts: [],
    }
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  getAllPostsByUser = async () => {
    try {
      this.setInputValue('isLoading', true);

      const { data } = await apiCall({
        method: 'get',
        URL: '/api/posts',
        // payload: {
        //   p_userid: AuthUtil.getPhone(),
        // },
      });
      // const categoryData = data.returnTables[0][0];

      // console.log(data);
      if (data) {
        this.setInputValue('posts', data);
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

  componentDidMount(){
    this.getAllPostsByUser();
  }

  render() {
    console.log(this.state.posts);
    return <Row className="account_container">
      <Table hover>
    <thead>
      <tr>
        <th>
          Post ID
        </th>
        <th>
          Type
        </th>
        <th>
          Short Title
        </th>
        <th>
          Amount
        </th>
        <th>
          Status
        </th>
        <th>
          Details
        </th>
      </tr>
    </thead>
    <tbody>
      {this.state.posts && this.state.posts.length !== 0 &&
      this.state.posts.map((post, index)=>(
      <tr key={index}>
        <td>
          <span>{post.id}</span>
      </td>
      <td>
         <span>{post.category}</span>
      </td>
      <td>
      <span>{post.shortTitle}</span>

      </td>
      
      <td>
          <span>{post.fundAmount}</span>
      </td>
      <td>
          <span>{post.postStatus}</span>
      </td>

      <td>
          <Button>View</Button>
      </td>
        
      </tr>
      ))}
    </tbody>
  </Table></Row>;
  }
}

export default withRouter(MyPosts);
