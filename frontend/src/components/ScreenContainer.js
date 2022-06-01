import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const ScreenContainer = ({ children }) => {
  return (
    <Container fluid>
      <Row className="common_screen_margin justify-content-md-center">
        <Col xs={12} md={11} className="common_screeen_container">
          {children}
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default ScreenContainer;
