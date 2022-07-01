import React, { Component } from 'react';
import { withRouter } from '../withRouter';
import { Outlet } from 'react-router-dom';

class MyPosts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Outlet />;
  }
}

export default withRouter(MyPosts);
