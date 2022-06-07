import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import Slider from '../components/Slider';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { withRouter } from '../components/withRouter';
import AuthUtil from '../utils/AuthUtil';
import { apiCall } from '../utils/apiCall';

class HomeScreen extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sliders: [],
    };
    this.checkLoggedInUser = this.checkLoggedInUser.bind(this);
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  fetchSliders = async () => {
    this.setInputValue('loading', true);
    const { data } = await apiCall({
      method: 'post',
      URL: 'http://www.daansadaqah.com:8443/getSliders',
      payload: {},
    });
    if (data.sliders) {
      this.setInputValue('sliders', data.sliders);
      this.setInputValue('loading', false);
    }
  };

  componentDidMount() {
    this.fetchSliders();
  }

  checkLoggedInUser = () => {
    if (!AuthUtil.getToken()) {
      this.props.navigate('/login');
    }
  };

  render() {
    const { loading, error, sliders } = this.state;
    return (
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <div className="btn_donation_fixed_mobile d-block d-sm-none">
              <Link to="/posts">
                <Button type="button" variant="dark" className="w-100">
                  Make A Donation
                </Button>
              </Link>
              <Link to="/posts">
                <Button type="button" variant="dark" className="w-100">
                  Seek A Donation
                </Button>
              </Link>
            </div>
            <div className="btn_donation_fixed_desktop d-none d-lg-block">
              <Link to="/posts">
                <Button type="button" variant="dark" className="w-100">
                  Make A Donation{' '}
                  <span>
                    <Image
                      className="btn_donation_right_hand"
                      src={'/images/right_hand.png'}
                    ></Image>
                  </span>
                </Button>
              </Link>
              <br />
              <div>
                <Link to="/posts">
                  <Button type="button" variant="dark" className="w-100">
                    Seek A Donation
                    <span>
                      <Image
                        className="btn_donation_left_hand"
                        src={'/images/left_hand.png'}
                      ></Image>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            <Slider sliders={sliders} />
          </>
        )}
      </>
    );
  }
}

export default withRouter(HomeScreen);
