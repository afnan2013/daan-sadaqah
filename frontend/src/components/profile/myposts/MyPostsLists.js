import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import { Table, Row, Button } from 'react-bootstrap';
import { apiCall } from '../../../utils/apiCall';
import AuthUtil from '../../../utils/AuthUtil';
import { Link } from 'react-router-dom';
import Message from '../../Message';

class MyPostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: undefined,
      message: undefined,
      posts: [],
    };
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
        method: 'post',
        URL: 'https://www.daansadaqah.com:8443/getMyPosts',
        payload: {
          p_userid: AuthUtil.getPhone(),
        },
      });
      // const categoryData = data.returnTables[0][0];

      if (data && data.returnTables[0]) {
        this.setInputValue('posts', data.returnTables[0]);
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

  convertToLocaleString = (string)=> {
    if (string !== ''){
      const trimed =  string.split(',').join('');
      const amount = parseInt(trimed);
      return amount.toLocaleString('en-US');
    }
    return string;
  }

  componentDidMount() {
    this.getAllPostsByUser();
  }

  render() {
    return (

      <Row className="account_container">
        {this.props.location.state && this.props.location.state.message && (
          <Message variant={'danger'}>{ this.props.location.state.message}</Message>
        )}
        <Table hover>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Type</th>
              <th>Short Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts &&
              this.state.posts.length !== 0 &&
              this.state.posts.map((post, index) => (
                <tr key={index}>
                  <td>
                    <span>{post.id}</span>
                  </td>
                  <td>
                    <span>{post.categoryname}</span>
                  </td>
                  <td>
                    <span>{post.shortTitle}</span>
                  </td>

                  <td>
                    <span>{this.convertToLocaleString(post.fundamount.toString())}</span>
                  </td>
                  <td>
                    <span>{post.poststatus}</span>
                  </td>

                  <td>
                  <Link to={`/profile/myposts/${post.id}`}>
                    <Button
                      type="submit"
                      variant="primary"
                      className="mx-auto"
                    >
                      View
                    </Button>
                  </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    );
  }
}

export default withRouter(MyPostsList);
