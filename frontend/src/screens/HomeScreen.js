import React from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'react-bootstrap';
import Slider from '../components/Slider';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listSliders } from '../actions/sliderActions';
import { withRouter } from '../components/withRouter';
import AuthUtil from '../utils/AuthUtil';

class HomeScreen extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.listSliders();
  }

  checkLoggedInUser = () => {
    if (!AuthUtil.getToken()) {
      this.props.navigate('/login');
    }
  };

  render() {
    const { loading, error, sliders } = this.props.sliderList;
    return (
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <div className="btn_donation_fixed_mobile d-block d-sm-none">
              <Button type="button" variant="dark" className="w-100">
                Make A Donation
              </Button>
              <Button type="button" variant="dark" className="w-100">
                Seek A Donation
              </Button>
            </div>
            <div className="btn_donation_fixed_desktop d-none d-lg-block">
              <Button type="button" variant="dark" className="w-100">
                Make A Donation{' '}
                <span>
                  <Image
                    className="btn_donation_right_hand"
                    src={'/images/right_hand.png'}
                  ></Image>
                </span>
              </Button>
              <br />
              <div>
                <Button type="button" variant="dark" className="w-100">
                  Seek A Donation
                  <span>
                    <Image
                      className="btn_donation_left_hand"
                      src={'/images/left_hand.png'}
                    ></Image>
                  </span>
                </Button>
              </div>
            </div>

            <Slider sliders={sliders} />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sliderList: state.sliderList,
  };
};

export default withRouter(
  connect(mapStateToProps, { listSliders })(HomeScreen)
);
