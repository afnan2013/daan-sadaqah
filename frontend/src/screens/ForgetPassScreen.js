import React from 'react';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { withRouter } from '../components/withRouter';
import {apiCall} from '../utils/apiCall';

class ForgetPassScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordForm: false,
      disableSendOTPButton: false,
      phone: '',
      OTP: '',
      password: '',
      confirmPassword: '',
      message: undefined,
      OTPid: ''
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitOTPHandler = this.submitOTPHandler.bind(this);
    this.submitPasswordHandler = this.submitPasswordHandler.bind(this);

  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  checkEnter = (thisEvent) => {
    if (thisEvent.keyCode === 13) {
      this.props.login(this.state.phone, this.state.password);
    }
  };

  resetForm = () => {
    this.setState({
      phone: '',
      password: '',
    });
  };

  submitOTPHandler = async (e) => {
    
    e.preventDefault();
    if(this.state.phone){
      const { data } = await apiCall({ method: 'post', URL: 'https://www.daansadaqah.com:8443/sendOTP' , payload: {p_userid: this.state.phone}});
      console.log(data);
      
      if(data.status === "sent"){
        this.setInputValue('OTPid', data.otpid);
        this.setInputValue('showPasswordForm', true);
        this.setInputValue('enableSendOTPButton', true);
      }else if (data.status === "USER0"){
        this.setInputValue('message', 'User not Found');
      }
    }else{
      this.setInputValue('message', 'Please enter your Phone Number');
    }
   
  };

  submitPasswordHandler = async (e) => {
    e.preventDefault();
    console.log("Submit Pass Fires")
    if (this.state.password !== this.state.confirmPassword) {
      this.setInputValue('message', 'Password do not match');
    } else {
        try{
            const { data } = await apiCall({ method: 'post', URL: 'https://www.daansadaqah.com:8443/setPassword' , payload: 
            {
            p_userid : this.state.phone,
            p_password: this.state.password,
            p_otp: this.state.OTP,
            p_otpid: this.state.OTPid
            }});
        

            console.log(data.returnTables);
            const validate= data.returnTables[0][0];
            if(validate.status === "complete"){
                this.props.navigate('/login'); 
            }
            else{
                this.setInputValue('message', 'Invalid OTP');
            }

            if(data.returTables){
                this.props.navigate('/'); 
            }
        }catch(err){
            console.log(err);
        }
      
    }
  };

  render() {
    const redirect = this.props.location.search
      ? this.props.location.search.split('=')[1]
      : '/';
    const loading = this.state.loading;
    const error = this.state.error;
    

    return (
      <FormContainer>
        <div className="auth_component">
          <h1>Forget Password</h1>
          {error && <Message variant={'danger'}>{error}</Message>}
          {this.state.message && (
            <Message variant={'danger'}>{this.state.message}</Message>
          )}

          {loading && <Loader />}
          <Form onSubmit={this.submitOTPHandler}>
            <Form.Group controlId="phone" className="form_field">
              <span className="form_icon">
                <i className="fa-solid fa-phone-flip"></i>
              </span>
              <Form.Control
                type=""
                placeholder="Enter phone number"
                value={this.state.phone}
                onChange={(e) => this.setInputValue('phone', e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="info"
              className="w-100 form_submit_button"
              disabled={this.state.disableSendOTPButton}
            >
              Send OTP
            </Button>
          </Form>

          {this.state.showPasswordForm && (
            <Form onSubmit={this.submitPasswordHandler}>
              <Form.Group controlId="otp" className="form_field">
                <span className="form_icon">
                  <i className="fa-solid fa-phone-flip"></i>
                </span>
                <Form.Control
                  type=""
                  placeholder="Enter OTP"
                  value={this.props.OTP}
                  onChange={(e) =>
                    this.setInputValue('OTP', e.target.value)
                  }
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="form_field">
                <span className="form_icon">
                  <i className="fa-solid fa-key"></i>
                </span>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={this.props.password}
                  onChange={(e) =>
                    this.setInputValue('password', e.target.value)
                  }
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="form_field">
                <span className="form_icon">
                  <i className="fa-solid fa-key"></i>
                </span>
                <Form.Control
                  type="password"
                  placeholder="Enter password again"
                  value={this.props.confirmPassword}
                  onChange={(e) =>
                    this.setInputValue('confirmPassword', e.target.value)
                  }
                  required
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100 form_submit_button"
              >
                Change Password
              </Button>
            </Form>
          )}

          <Row>
            <Col>
              Already a User?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </Col>
          </Row>
        </div>
      </FormContainer>
    );
  }
}

export default withRouter(ForgetPassScreen);
