import React from 'react';
import { Row, Col, Image, Button, Card } from 'react-bootstrap';
import { apiCall } from '../utils/apiCall';

const read = async (id, callback) => {
  try {
    const { data } = await apiCall({
      method: 'post',
      URL: 'https://www.daansadaqah.com:8443/readNotification',
      payload: {
        p_id: id,
      },
    });

    if (data) {
      callback();
    }
  } catch (error) {}
};

const NotificationPanel = (props) => {
  return (
    <div
      className={
        props.show ? 'notification_panel active' : 'notification_panel'
      }
    >
      <h2>Notifications</h2>

      <ul>
        {props.notifications && props.notifications.length !== 0 ? (
          props.notifications.map((notif) => (
            <li key={notif.id}>
              <Card>
                <Row>
                  <Col sm={2} xs={2}>
                    <Image
                      src="/images/Daan-Sadaqah-65x80_PNG.png"
                      fluid
                    ></Image>
                  </Col>
                  <Col sm={7} xs={7}>
                    <span>{notif.message}</span>
                    <br />
                    <span>{notif.datetimecreated}</span>
                  </Col>
                  <Col sm={2} xs={2}>
                    {!notif.datetimeread && (
                      <Button onClick={() => read(notif.id, props.callback)}>
                        Read
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card>
            </li>
          ))
        ) : (
          <p className="my-3 text-center">No Notification</p>
        )}
      </ul>
    </div>
  );
};

export default NotificationPanel;
