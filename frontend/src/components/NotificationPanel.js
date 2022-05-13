import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Button } from 'react-bootstrap';

const NotificationPanel = ({ show }) => {
  return (
    <div className={show ? 'notification_panel active' : 'notification_panel'}>
      <h2>Notifications</h2>
      <Button>All</Button> <Button>Unread</Button>
      <ul>
        <li>
          <Link to={'/'}>
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
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NotificationPanel;
