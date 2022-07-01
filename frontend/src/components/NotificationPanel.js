import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Button, Card } from 'react-bootstrap';
import { apiCall } from '../utils/apiCall';

const read = async (id) =>{
  try {
    const { data } = await apiCall({
      method: 'post',
      URL: 'http://www.daansadaqah.com:8443/readNotification',
      payload: {
        p_id: id
      },
    });
    
  } catch (error) {
    
  }
}

const NotificationPanel = (props) => {

 
  return (
    <div className={props.show ? 'notification_panel active' : 'notification_panel'}>
      <h2>Notifications</h2>
     
      <ul>
        {(props.notifications && props.notifications.length !== 0) ? props.notifications.map((notif => (

       
        <li>
            <Card>
            <Row>
              <Col sm={2}>
                <Image src="/images/Daan-Sadaqah-65x80_PNG.png" fluid></Image>
              </Col>
              <Col sm={7}>
                <span>{notif.message}</span>
                <br />
                <span>{notif.datetimecreated}</span>
              </Col>
              <Col sm={2}>
                {!notif.datetimeread && 
                <Button onClick={()=> read(notif.id)}>Read</Button>}
              </Col>
            </Row>
            </Card>
        </li>
        ))): (<p className='my-3 text-center'>No Notification</p>)}
      </ul>
    </div>
  );
};

export default NotificationPanel;
