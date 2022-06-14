import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import AuthUtil from '../../utils/AuthUtil';
import { apiCall } from '../../utils/apiCall';
import { withRouter } from '../withRouter';
import { Outlet } from 'react-router-dom';

class CreatePost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Outlet />;
  }
}

export default withRouter(CreatePost);
