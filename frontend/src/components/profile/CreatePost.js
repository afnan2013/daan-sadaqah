import React, { Component } from 'react';
import { withRouter } from '../withRouter';
import { Outlet } from 'react-router-dom';
import AuthUtil from '../../utils/AuthUtil';
import {apiCall} from '../../utils/apiCall'

class CreatePost extends Component {
  constructor(props) {
    super(props);
  }

  checkCreatePost =  async()=> {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'https://www.daansadaqah.com:8443/checkCreatePost',
        payload: {
          p_userid: AuthUtil.getPhone(),
        },
      });

      if(data.returnTables[0][0].decision === 'restrict'){
        this.props.navigate('/profile/myposts/lists',{state: {message: "You have posts in opened or InApproval or InReview State. Please close them first"}})
      }
    } catch (error) {
      
    }
    
  }

  componentDidMount (){
    this.checkCreatePost();
  }
  render() {
    return <Outlet />;
  }
}

export default withRouter(CreatePost);
