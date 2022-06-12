import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import Message from '../../Message';
import Loader from '../../Loader';
import AuthUtil from '../../../utils/AuthUtil';
import { apiCall } from '../../../utils/apiCall';
import { withRouter } from '../../withRouter';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      mfs_number: AuthUtil.getPhone(),
      mfs_preferred: '',
      mfs_name_bkash: 'BKash',
      mfs_icon_bkash: '',
      mfs_link_bkash: '',
      isValidated_bkash: 'No',
      mfs_name_nagad: 'Nagad',
      mfs_icon_nagad: '',
      mfs_link_nagad: '',
      isValidated_nagad: 'No',
      mfs_name_rocket: 'Rocket',
      mfs_icon_rocket: '',
      mfs_link_rocket: '',
      isValidated_rocket: 'No',
      mfs_name_tap: 'Tap',
      mfs_icon_tap: '',
      mfs_link_tap: '',
      isValidated_tap: 'No',
      mfs_name_mycash: 'MyCash',
      mfs_icon_mycash: '',
      mfs_link_mycash: '',
      isValidated_mycash: 'No',
      mfs_name_okwallet: 'OkWallet',
      mfs_icon_okwallet: '',
      mfs_link_okwallet: '',
      isValidated_okwallet: 'No',
      bank_label: '',
      bank_account_number: '',
      bank_name: '',
      bank_branch: '',
      bank_routing_number: '',
      bank_check_leaf_image: '',
      message: undefined,
      isLoading: false,
      OTP: '',
      OTPid: '',
      showValidateOTPForm: false,
    };
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  getPaymentMethodData = async () => {
    this.setInputValue('isLoading', true);
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/getPaymentData',
        payload: { p_userid: AuthUtil.getPhone() },
      });
      // console.log("Payment Data - ", data);
      if (data) {
        // this.setInputValue("mfs_details", data.mfsDetails);
        // this.setInputValue("bank_details", data.bankDetails);
        // this.setInputValue("accountNumber", data.bankDetails.account_number);
        // this.setInputValue("bankName", data.bankDetails.bank_name);
        // this.setInputValue("branch", data.bankDetails.branch);
        // this.setInputValue("routingNumber", data.bankDetails.routing_number);
        // this.setInputValue("chequeLeafPic", data.bankDetails.check_leaf_image);
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

  sendOTPHandler = async (e) => {
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
  };

  submitOTPHandler = async (e) => {
    e.preventDefault();
    const redirect = '/profile';
    if (!AuthUtil.getToken()) {
      return this.props.navigate(`/login?redirect=${redirect}`);
    }

    try {
      const paymentData = {
        p_mfs_number: this.state.mfs_number,
        p_mfs_name_bkash: this.state.mfs_name_bkash,
        p_mfs_icon_bkash: this.state.mfs_icon_bkash,
        p_mfs_link_bkash: this.state.mfs_link_bkash,
        p_isValidated_bkash: this.state.isValidated_bkash,
        p_mfs_name_nagad: this.state.mfs_name_nagad,
        p_mfs_icon_nagad: this.state.mfs_icon_nagad,
        p_mfs_link_nagad: this.state.mfs_link_nagad,
        p_isValidated_nagad: this.state.isValidated_nagad,
        p_mfs_name_rocket: this.state.mfs_name_rocket,
        p_mfs_icon_rocket: this.state.mfs_icon_rocket,
        p_mfs_link_rocket: this.state.mfs_link_rocket,
        p_isValidated_rocket: this.state.isValidated_rocket,
        p_mfs_name_tap: this.state.mfs_name_tap,
        p_mfs_icon_tap: this.state.mfs_icon_tap,
        p_mfs_link_tap: this.state.isValidated_tap,
        p_isValidated_tap: this.state.isValidated_tap,
        p_mfs_name_mycash: this.state.mfs_name_mycash,
        p_mfs_icon_mycash: this.state.mfs_icon_mycash,
        p_mfs_link_mycash: this.state.mfs_link_mycash,
        p_isValidated_mycash: this.state.isValidated_mycash,
        p_mfs_name_okwallet: this.state.mfs_name_okwallet,
        p_mfs_icon_okwallet: this.state.mfs_icon_okwallet,
        p_mfs_link_okwallet: this.state.mfs_link_okwallet,
        p_isValidated_okwallet: this.state.isValidated_okwallet,
        p_mfs_preferred: this.state.mfs_preferred,
        p_bank_label: this.state.bank_label,
        p_bank_account_number: this.state.bank_account_number,
        p_bank_name: this.state.bank_name,
        p_bank_branch: this.state.bank_branch,
        p_bank_routing_number: this.state.bank_routing_number,
        p_bank_check_leaf_image: this.state.bank_check_leaf_image,
        p_userid: AuthUtil.getPhone(),
        p_otp: this.state.OTP,
        p_otpid: this.state.OTPid,
      };
      console.log(paymentData);
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/updatePaymentData',
        payload: paymentData,
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
      console.log(error);
      this.setState({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        enable: '',
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getPaymentMethodData();
  }

  onClickRadioHandler = (e) => {
    if (e.target.value) {
      this.setInputValue('mfs_preferred', e.target.value);
    }
  };
  render() {
    console.log(this.state.mfs_preferred);
    return (
      <Row className="account_container">
        {this.state.error && (
          <Message variant={'danger'}>{this.state.error}</Message>
        )}
        {this.state.message && (
          <Message variant={'danger'}>{this.state.message}</Message>
        )}
        {/* {success && <Message variant={'success'}>Profile Updated!</Message>} */}
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <>
            <Row className="my-2 form_row">
              <Col md={3}>
                <div className="payment_label">
                  <span>MFS Account</span>
                </div>
                <div className="payment_label">
                  <span>{this.state.mfs_number}</span>
                </div>
              </Col>
              <Col md={9}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>
                        <Link to={this.state.mfs_link_bkash}>
                          <span className="common_link_hover">
                            {this.state.mfs_name_bkash}{' '}
                          </span>
                        </Link>
                      </th>
                      <th>
                        <Link to={this.state.mfs_link_nagad}>
                          <span className="common_link_hover">
                            {this.state.mfs_name_nagad}
                          </span>
                        </Link>
                      </th>

                      <th>
                        <Link to={this.state.mfs_link_rocket}>
                          <span className="common_link_hover">
                            {this.state.mfs_name_rocket}
                          </span>
                        </Link>
                      </th>

                      <th>
                        <Link to={this.state.mfs_link_mycash}>
                          <span className="common_link_hover">
                            {this.state.mfs_name_mycash}
                          </span>
                        </Link>
                      </th>
                      <th>
                        <Link to={this.state.mfs_link_tap}>
                          <span className="common_link_hover">
                            {this.state.mfs_name_tap}
                          </span>
                        </Link>
                      </th>
                      <th>
                        <Link to={this.state.mfs_link_okwallet}>
                          <span className="common_link_hover">
                            {this.state.mfs_name_okwallet}
                          </span>
                        </Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="radio"
                          className="radio"
                          name="mfs"
                          onChange={this.onClickRadioHandler}
                          value={this.state.mfs_name_bkash}
                          checked={this.state.mfs_preferred === 'BKash'}
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          className="radio"
                          name="mfs"
                          onChange={this.onClickRadioHandler}
                          value={this.state.mfs_name_nagad}
                          checked={this.state.mfs_preferred === 'Nagad'}
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          className="radio"
                          name="mfs"
                          onChange={this.onClickRadioHandler}
                          value={this.state.mfs_name_rocket}
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          className="radio"
                          name="mfs"
                          onChange={this.onClickRadioHandler}
                          value={this.state.mfs_name_mycash}
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          className="radio"
                          name="mfs"
                          onChange={this.onClickRadioHandler}
                          value={this.state.mfs_name_tap}
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          className="radio"
                          name="mfs"
                          onChange={this.onClickRadioHandler}
                          value={this.state.mfs_name_okwallet}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {this.state.isValidated_bkash ? (
                          <span>Yes</span>
                        ) : (
                          <span>No</span>
                        )}
                      </td>
                      <td>
                        {this.state.isValidated_nagad ? (
                          <span>Yes</span>
                        ) : (
                          <span>No</span>
                        )}
                      </td>
                      <td>
                        {this.state.isValidated_rocket ? (
                          <span>Yes</span>
                        ) : (
                          <span>No</span>
                        )}
                      </td>
                      <td>
                        {this.state.isValidated_mycash ? (
                          <span>Yes</span>
                        ) : (
                          <span>No</span>
                        )}
                      </td>
                      <td>
                        {this.state.isValidated_tap ? (
                          <span>Yes</span>
                        ) : (
                          <span>No</span>
                        )}
                      </td>
                      <td>
                        {this.state.isValidated_okwallet ? (
                          <span>Yes</span>
                        ) : (
                          <span>No</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <br />
            <Row className="my-2 form_row">
              <Col md={3}>
                <div className="payment_label">
                  <span>{this.state.bank_label}</span>
                </div>
              </Col>
            </Row>
            <Form onSubmit={this.sendOTPHandler}>
              <Form.Group controlId="bank_account_number">
                <Row className="my-2 form_row">
                  <Col md={3}>
                    <p>Account Number</p>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="form_field"
                      value={this.state.bank_account_number}
                      onChange={(e) =>
                        this.setInputValue(
                          'bank_account_number',
                          e.target.value
                        )
                      }
                      required
                    ></Form.Control>
                  </Col>
                  <Col md={3}></Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="bank_name">
                <Row className="my-2 form_row">
                  <Col md={3}>
                    <p>Bank Name</p>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="form_field"
                      value={this.state.bank_name}
                      onChange={(e) =>
                        this.setInputValue('bank_name', e.target.value)
                      }
                      required
                    ></Form.Control>
                  </Col>
                  <Col md={3}></Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="bank_branch">
                <Row className="my-2 form_row">
                  <Col md={3}>
                    <p>Branch</p>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      className="form_field"
                      placeholder=""
                      value={this.state.bank_branch}
                      onChange={(e) =>
                        this.setInputValue('bank_branch', e.target.value)
                      }
                      required
                    ></Form.Control>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="bank_routing_number">
                <Row className="my-2 form_row">
                  <Col md={3}>
                    <p>Routing Number</p>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      className="form_field"
                      placeholder=""
                      value={this.state.bank_routing_number}
                      onChange={(e) =>
                        this.setInputValue(
                          'bank_routing_number',
                          e.target.value
                        )
                      }
                      required
                    ></Form.Control>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="bank_check_leaf_image">
                <Row className="my-2 form_row">
                  <Col md={3}>
                    <p>Cheque Leaf (Pic)</p>
                  </Col>
                  <Col md={6}>
                    {this.state.bank_check_leaf_image && (
                      <img
                        src={this.state.bank_check_leaf_image}
                        className="form_image"
                      />
                    )}
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
                <Button
                  type="submit"
                  variant="primary"
                  className="w-25 my-3 mx-auto"
                >
                  Update
                </Button>
              </Row>
            </Form>
          </>
        )}

        {this.state.showValidateOTPForm && (
          <Form onSubmit={this.submitOTPHandler}>
            <Form.Group controlId="otp">
              <Row className="my-2 form_row">
                <Col md={3}></Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    className="form_field"
                    placeholder="Enter OTP"
                    value={this.props.OTP}
                    onChange={(e) => this.setInputValue('OTP', e.target.value)}
                    required
                  ></Form.Control>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form.Group>
            <Row className="text-center">
              <Button
                type="submit"
                variant="success"
                className="w-25 my-3 mx-auto"
              >
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
