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
            <Image src="/images/Daan-Sadaqah-65x80_PNG.png" fluid></Image>{' '}
          </Col>
          <Col sm={6} className="text-center">
            <h2>Our Statistics</h2>
            <h2>
              <span>100,000 donors</span> | <span>1,500,000 seekers</span>
            </h2>
          </Col>
          <Col sm={3}> </Col>
        </Row>

        <Row className=" align-items-center">
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
            <Row>
              <Col>
                <ul>
                  <li>
                    <Link to={``} className="px-3">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to={``} className="px-3">
                      What we do
                    </Link>
                  </li>
                  <li>
                    <Link to={``} className="px-3">
                      Press release
                    </Link>
                  </li>
                  <li>
                    <Link to={``} className="px-3">
                      Photo Gallery
                    </Link>
                  </li>
                  <li>
                    <Link to={``} className="px-3">
                      Career
                    </Link>
                  </li>
                  <li>
                    <Link to={``} className="px-3">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col>
                <ul>
                  <li>
                    <Link to={``} className="px-3">
                      Useful links
                    </Link>
                  </li>
                  <li>
                    <Link to={``} className="px-3">
                      How to use
                    </Link>
                  </li>
                  <li>
                    <Link to={``} className="px-3">
                      Video tutorial
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col>
                <li>
                  <Link to={``} className="px-3">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to={``} className="px-3">
                    Online Support
                  </Link>
                </li>
              </Col>
              <Col>
                <li>
                  <Link to={``} className="px-3">
                    App
                  </Link>
                </li>
                <li>
                  <Link to={``} className="footer_app_btn px-3">
                    <Image src="/images/google-play.png"></Image>
                  </Link>
                </li>
                <li>
                  <Link to={``} className="footer_app_btn px-3">
                    <Image src="/images/apple-play.png"></Image>
                  </Link>
                </li>
              </Col>
            </Row>
          </Col>
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
