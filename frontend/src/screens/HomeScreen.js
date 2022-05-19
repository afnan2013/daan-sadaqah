import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Slider from '../components/Slider';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listSliders } from '../actions/sliderActions';
import { withRouter } from '../components/withRouter';

class HomeScreen extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.listSliders();
  }

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
              {/* <Image src={'/images/upright-hand.png'}></Image> */}
              <Button type="button" variant="dark" className="w-100">
                Make A Donation
              </Button>
              <br />
              <Button type="button" variant="dark" className="w-100">
                Seek A Donation
              </Button>
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
