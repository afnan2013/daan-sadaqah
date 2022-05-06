import React from 'react';
import { Carousel } from 'react-bootstrap';

const Slider = ({ sliders }) => {
  return (
    <Carousel pause={false}>
      {sliders.map((slider) => (
        <Carousel.Item key={slider.serial}>
          <img className="d-block w-100" src={slider.image} alt="First slide" />
          <Carousel.Caption>
            <h3
              style={{
                color: `${slider.fontColor}`,
                fontSize: `${slider.fontSize}`,
              }}
            >
              “{slider.description}”
            </h3>
            <p
              style={{
                color: `${slider.fontColor}`,
                fontSize: `${slider.fontSize}`,
              }}
            >
              - {slider.author}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
