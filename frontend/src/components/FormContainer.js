import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container fluid>
      <Row className="common_screen_margin justify-content-md-center">
        <Col xs={12} md={6} className='common_form_container'>
          {children}
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default FormContainer;
