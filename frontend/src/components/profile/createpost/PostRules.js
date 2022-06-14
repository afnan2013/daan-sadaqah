import React, { Component } from 'react';
import { ListGroup, Row, Button } from 'react-bootstrap';
import Message from '../../Message';
import Loader from '../../Loader';
import { apiCall } from '../../../utils/apiCall';
import { withRouter } from '../../withRouter';
import { Link } from 'react-router-dom';

class PostRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      message: undefined,
      success: undefined,
      isLoading: false,
      checkboxChecked: false,
      rules: [],
    };
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  getPostRulesData = async () => {
    try {
      this.setInputValue('isLoading', true);

      const { data } = await apiCall({
        method: 'get',
        URL: '/api/postRules',
        // payload: {
        //   p_userid: AuthUtil.getPhone(),
        // },
      });
      // const categoryData = data.returnTables[0][0];

      console.log(data);
      if (data) {
        this.setInputValue('rules', data.rules);
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

  componentDidMount() {
    this.getPostRulesData();
  }

  render() {
    console.log('CheckBox State', this.state.checkboxChecked);
    return (
      <Row className="account_container">
        <h2>General Rules</h2>
        <ListGroup>
          {this.state.rules &&
            this.state.rules.length !== 0 &&
            this.state.rules.map((rule) => (
              <ListGroup.Item key={rule.serial}>
                Rule # {rule.serial}: {rule.text}{' '}
              </ListGroup.Item>
            ))}
        </ListGroup>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                type="checkbox"
                onChange={() =>
                  this.setInputValue(
                    'checkboxChecked',
                    !this.state.checkboxChecked
                  )
                }
              />
              Read and Agree To Proceed
            </div>
          </div>
        </div>
        {this.state.checkboxChecked && (
          <Row className="text-center">
            <Link to={'/profile/createpost/form'}>
              <Button
                type="submit"
                variant="primary"
                className="w-50 my-3 mx-auto"
              >
                Proceed To Create A Post
              </Button>
            </Link>
          </Row>
        )}
      </Row>
    );
  }
}

export default withRouter(PostRules);
