import React, { Component } from 'react';
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
