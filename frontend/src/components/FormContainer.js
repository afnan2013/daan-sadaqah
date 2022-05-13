import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container fluid>
      <Row className="common_form_margin justify-content-md-center">
        <Col
          xs={12}
          sm={12}
          md={7}
          lg={5}
          xl={5}
          xxl={4}
          className="common_form_container"
        >
          {children}
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default FormContainer;
