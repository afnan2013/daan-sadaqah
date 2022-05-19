import React from 'react';
import { Carousel } from 'react-bootstrap';

const Slider = ({ sliders }) => {
	console.log("sliders issue: 1");
	
	let l = 0;
	
	try
	{
		l = sliders.length;
	}
	catch(e)
	{
	}
	
	if (l === 0)
		return (<div>slider load failed</div>);
	
	console.log("sliders issue: 2");
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
