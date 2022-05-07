import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image } from 'react-bootstrap';
import Slider from '../components/Slider';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listSliders } from '../actions/sliderActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const sliderList = useSelector((state) => state.sliderList);
  const { loading, error, sliders } = sliderList;

  // console.log(sliders);

  useEffect(() => {
    dispatch(listSliders());
  }, [dispatch]);

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
};

export default HomeScreen;
