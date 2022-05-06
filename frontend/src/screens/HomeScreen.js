import React from 'react';
import { Button, Image } from 'react-bootstrap';
import Slider from '../components/Slider';

const HomeScreen = () => {
  return (
    <>
      <div className="fixed_content">
        {/* <Image src={'/images/upright-hand.png'}></Image> */}
        <Button type="button" variant="dark" className="w-100">
          Make A Donation
        </Button>
        <br />
        <Button type="button" variant="dark" className="w-100">
          Seek A Donation
        </Button>
      </div>
      <Slider />
    </>
  );
};

export default HomeScreen;
