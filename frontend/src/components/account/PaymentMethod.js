import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import AuthUtil from '../../utils/AuthUtil';
import {apiCall} from '../../utils/apiCall';
import { withRouter } from '../withRouter';


class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      mfs_details: {},
      bank_details:{},
      accountNumber:'',
      bankName:'',
      branch:'',
      routingNumber:'',
      chequeLeafPic:'',
      message: undefined,
      isLoading: false,
      otp: '',
      otpId: '',
      showValidateOTPForm: false
    };
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  getPaymentMethodData = async ()=> {
    this.setInputValue('isLoading',true);
    try {
      
      const { data } = await apiCall({
        method: 'get',
        URL: '/api/payments',
        payload: {},
      });
      // console.log("Payment Data - ", data);
      if (data) {
        this.setInputValue("mfs_details", data.mfsDetails);
        this.setInputValue("bank_details", data.bankDetails);
        this.setInputValue("accountNumber", data.bankDetails.account_number);
        this.setInputValue("bankName", data.bankDetails.bank_name);
        this.setInputValue("branch", data.bankDetails.branch);
        this.setInputValue("routingNumber", data.bankDetails.routing_number);
        this.setInputValue("chequeLeafPic", data.bankDetails.check_leaf_image);
        this.setInputValue('isLoading', false);
    
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('isLoading', false);
      }
    } catch (error) {
      console.log(error)
      this.setState({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        enable: '',
        loading: false,
      });
    }
  }

  sendOTPHandler = async(e)=> {
    e.preventDefault();
    // this.setInputValue('showValidateOTPForm', true);
    // return;

    if (AuthUtil.getPhone()) {
      try {
        const { data } = await apiCall({
          method: 'post',
          URL: 'http://www.daansadaqah.com:8443/sendOTP',
          payload: { p_userid: AuthUtil.getPhone() },
        });
        console.log(data);

        if (data.status === 'sent') {
          this.setInputValue('OTPid', data.otpid);
          this.setInputValue('showValidateOTPForm', true);
        } else if (data.status === 'USER1') {
          this.setInputValue('message', 'User Already Exists');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setInputValue('message', 'Please Login First');
    }
  }

  submitOTPHandler = async (e)=> {
    e.preventDefault();
    const redirect = "/profile";
    if (!AuthUtil.getToken()) {
      return this.props.navigate(`/login?redirect=${redirect}`);
    }

    try {
      const bankDetails = {
        accountNumber: this.state.accountNumber,
        bankName: this.state.bankName,
        branch: this.state.branch,
        routingNumber: this.state.routingNumber,
        chequeLeafPic: this.state.chequeLeafPic,
        phone: AuthUtil.getPhone(),
        otp: this.state.OTP,
        otpid: this.state.OTPid
      }
      console.log(bankDetails);
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/updateBankDetails',
        payload: bankDetails,
        publicAccess: false,
        token: AuthUtil.getToken()
      });
      console.log(data.returnTables);
      if (data.returnTables) {
        // const roles = data.returnTables[0];
        // const menulist = data.returnTables[1];
        // const [user] = data.returnTables[2];

        // const rolelist = roles.map((role) => role.rolecode);

        console.log(data);
        this.setState({
          enable: '',
          loading: false,
        });
    
      } else {
        this.setInputValue('error', 'Invalid Credentials');
        this.setInputValue('loading', false);
        this.resetForm();
      }
    } catch (error) {
      console.log(error)
      this.setState({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        enable: '',
        loading: false,
      });
    }
  }

  componentDidMount(){
    this.getPaymentMethodData();
  }
  render() {

    const mfs_data = this.state.mfs_details;
    const bank_data = this.state.bank_details;
    
    console.log(mfs_data);
  

    return (
      <Row className='account_container'>
        {this.state.error && (
          <Message variant={'danger'}>{this.state.error}</Message>
        )}
        {this.state.message && (
          <Message variant={'danger'}>{this.state.message}</Message>
        )}
        {/* {success && <Message variant={'success'}>Profile Updated!</Message>} */}
        {this.state.isLoading ? <Loader />: 
        <>
      
        <Row className='my-2 form_row'>
          <Col md={3}>
            <div className='payment_label'>
              <span>{mfs_data.mfs_label}</span>
            </div>
            <div className='payment_label'>
              <span>{mfs_data.mfs_number}</span>
            </div>
          </Col>
          <Col md={9}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {mfs_data.mfs_companies && mfs_data.mfs_companies.length !== 0 &&
                    mfs_data.mfs_companies.map(company => 
                      <th key={company.serial}>
                        <Link to={company.mfs_link}>
                          <span className="common_link_hover">{company.mfs_name}</span>
                        </Link>
                      </th>
                    )
                  } 
                </tr>
              </thead>
              <tbody>
                <tr>
                  {mfs_data.mfs_companies && mfs_data.mfs_companies.length !== 0 &&
                    mfs_data.mfs_companies.map(company => 
                      <td key={company.serial}>
                        {company.isValidated ? 
                          <span>Yes</span>:
                          <span>No</span>
                        }
                      </td>
                    )
                  } 
                </tr>
          
              </tbody>
            </Table>
          
          </Col>
              
        </Row>
        <br />
        <Row className='my-2 form_row'>
          <Col md={3}>
            <div className='payment_label'>
              <span>{bank_data.bank_label}</span>
            </div>
          </Col>
        </Row>
        <Form onSubmit={this.sendOTPHandler}>
          <Form.Group controlId="accountNumber">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Account Number</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder=""
                  className="form_field"
                  value={this.state.accountNumber}
                  onChange={(e) => this.setInputValue('accountNumber', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="bankName">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Bank Name</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder=""
                  className="form_field"
                  value={this.state.bankName}
                  onChange={(e) => this.setInputValue('bankName', e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col md={3}>
                
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="branch">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Branch</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  className="form_field"
                  placeholder=""
                  value={this.state.branch}
                  onChange={(e) => this.setInputValue('branch', e.target.value)}
                  required
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="routingNumber">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Routing Number</p>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  className="form_field"
                  placeholder=""
                  value={this.state.routingNumber}
                  onChange={(e) => this.setInputValue('routingNumber', e.target.value)}
                  required
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="chequeLeafPic">
            <Row className='my-2 form_row'>
              <Col md={3}>
                <p>Cheque Leaf (Pic)</p>
              </Col>
              <Col md={6}>
                {this.state.chequeLeafPic && <img src={this.state.chequeLeafPic} className='form_image'/>}
                <Form.Control
                  type="file"
                  className="form_field"
                  onChange={(event) =>
                    this.encodeImageFileURL(event, 'chequeLeafPic')
                  }
                ></Form.Control>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form.Group>
          <Row className="text-center">
            <Button type="submit" variant="primary" className="w-25 my-3 mx-auto">
              Update
            </Button>
          </Row>
        </Form>
        </>}
        

        {this.state.showValidateOTPForm && (
            <Form onSubmit={this.submitOTPHandler}>
              <Form.Group controlId="otp">
                <Row className='my-2 form_row'>
                <Col md={3}></Col>
                <Col md={6}>
                  <Form.Control
                      type="text"
                      className="form_field"
                      placeholder="Enter OTP"
                      value={this.props.OTP}
                      onChange={(e) =>
                        this.setInputValue('OTP', e.target.value)
                      }
                      required
                    ></Form.Control>
                </Col>
                <Col md={3}></Col>
                </Row>
              </Form.Group>
              <Row className="text-center">
                <Button type="submit" variant="success" className="w-25 my-3 mx-auto">
                  Validate OTP
                </Button>
              </Row>
            </Form>
            
          )}

      </Row>
    );
  }
}


export default withRouter(PaymentMethod);