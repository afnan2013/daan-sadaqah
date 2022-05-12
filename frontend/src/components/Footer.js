import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row className="align-items-center">
          <Col sm={3} className="text-center">
            <Image
              src="/images/Daan-Sadaqah-65x80_PNG.png"
              className="footer_logo"
              fluid
            ></Image>{' '}
          </Col>
          <Col sm={6} className="text-center">
            <h2>Our Statistics</h2>
            <h2>
              <span>100,000 donors</span> | <span>1,500,000 seekers</span>
            </h2>
          </Col>
          <Col sm={3}> </Col>
        </Row>

        <Row className="align-items-center">
          <Col md={4}>
            <p>Follow us</p>
            <Link to={``} className="social_icon_styles px-3">
              <FaFacebook />
            </Link>
            <Link to={``} className="social_icon_styles px-3">
              <FaYoutube />
            </Link>
            <Link to={``} className="social_icon_styles px-3">
              <FaInstagram />
            </Link>
            <Link to={``} className="social_icon_styles px-3">
              <FaTwitter />
            </Link>
            <Link to={``} className="social_icon_styles px-3">
              <FaLinkedin />
            </Link>
          </Col>
          <Col md={8}>
            <Row className="footer_row">
              <Col>
                <ul>
                  <li>
                    <Link to={'/about'}>About</Link>
                  </li>
                  <li>
                    <Link to={'/whatwedo'}>What we do</Link>
                  </li>
                  <li>
                    <Link to={'/pressrelease'}>Press release</Link>
                  </li>
                  <li>
                    <Link to={'/photogallery'}>Photo Gallery</Link>
                  </li>
                  <li>
                    <Link to={'/career'}>Career</Link>
                  </li>
                  <li>
                    <Link to={'/contactus'}>Contact us</Link>
                  </li>
                </ul>
              </Col>
              <Col>
                <ul>
                  <li>
                    <Link to={'/usefulLinks'}>Useful links</Link>
                  </li>
                  <li>
                    <Link to={'/howtouse'}>How to use</Link>
                  </li>
                  <li>
                    <Link to={'/videotutorial'}>Video tutorial</Link>
                  </li>
                </ul>
              </Col>
              <Col>
                <ul>
                  <li>
                    <Link to={'/support'}>Support</Link>
                  </li>
                  <li>
                    <Link to={'/onlinesupport'}>Online Support</Link>
                  </li>
                </ul>
              </Col>
              <Col>
                <ul>
                  <li>
                    <Link to={'/mobileapp'}>App</Link>
                  </li>
                  <li>
                    <Link to={``} className="footer_app_btn">
                      <Image
                        src="/images/google-play.png"
                        rounded
                        fluid
                      ></Image>
                    </Link>
                  </li>
                  <li>
                    <Link to={``} className="footer_app_btn">
                      <Image src="/images/apple-play.png" rounded fluid></Image>
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <h1>DaanSadaqah</h1>
        </Row>
        <hr />
        <Row>
          <Col className="commom_footer_styles py-3">
            Copyright &copy; 2022 DaanSadaqah Social Welfare | Part of LynOrg
            Inc.
          </Col>
          <Col className="commom_footer_styles footer_right_panel py-3">
            <Link to={``} className="px-5">
              Privacy Policy
            </Link>
            <Link to={``} className="px-5">
              Terms of Use
            </Link>
            <Link to={``} className="px-5">
              Sitemap
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
