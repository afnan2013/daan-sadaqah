import React from 'react';
import { Carousel } from 'react-bootstrap';

const Slider = () => {
  return (
    <Carousel pause={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slider-1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>
            “Never get tired of doing little things for others, sometimes those
            little things occupy the biggest parts of their hearts”
          </h3>
          <p>- Unknown</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slider-2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slider-3.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
