import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

const NotificationPanel = ({ show }) => {
  return (
    <div className={show ? 'notification_panel active' : 'notification_panel'}>
      <ul>
        <li>
          <Row>
            <Col sm={3}>
              <Image src="/images/Daan-Sadaqah-65x80_PNG.png" fluid></Image>
            </Col>
            <Col sm={8}>
              <span>I just posted to Facebook have a relax.</span>
              <br />
              <span>14 mins ago</span>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </li>
      </ul>
    </div>
  );
};

export default NotificationPanel;
