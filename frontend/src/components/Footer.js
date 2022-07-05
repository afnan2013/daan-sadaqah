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
import Loader from './Loader';
import { apiCall } from '../utils/apiCall';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      footerLinks: [],
      statistics: {},
    };
  }

  setInputValue = (property, val) => {
    this.setState({
      [property]: val,
    });
  };

  getFooterData = async () => {
    this.setInputValue('isLoading', true);

    const { data } = await apiCall({
      method: 'post',
      URL: 'http://www.daansadaqah.com:8443/getFooters',
      payload: {},
    });
    // console.log(data.statistics.banner);

    this.setInputValue('isLoading', false);
    this.setInputValue('footerLinks', data.footerData.footerLinks);
    this.setInputValue('statistics', data.footerData.statistics);
  };

  getFooterDesign = () => {
    if (this.state.isLoading) {
      return <Loader />;
    }

    const banner = this.state.statistics.banner;
    const donorCount = this.state.statistics.donorCount;
    const seekerCount = this.state.statistics.seekerCount;
    console.log(banner);
    let footerDesign = (
      <Container fluid>
        <Row className="align-items-center">
          <Col sm={3} className="text-center ">
            <Image
              src="/images/logo_only.png"
              className="footer_logo"
              fluid
            ></Image>{' '}
          </Col>
          <Col sm={6} className="text-center">
            <h2>{banner && banner.text}</h2>
            {donorCount && seekerCount && (
              <h2>
                <span style={{ color: `${donorCount.fontColor}` }}>
                  {donorCount && donorCount.count} doners
                </span>{' '}
                |{' '}
                <span style={{ color: `${seekerCount.fontColor}` }}>
                  {seekerCount && seekerCount.count} seekers
                </span>
              </h2>
            )}
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
              {this.state.footerLinks &&
                this.state.footerLinks.map((footerLink) => (
                  <Col key={footerLink.serial}>
                    <ul>
                      <li>{footerLink.name}</li>

                      {footerLink.links &&
                        footerLink.links.map((link) => (
                          <li key={link.serial}>
                            <Link
                              to={link.path}
                              className="nav-link"
                              style={{
                                padding: '0px',
                              }}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}

                      {footerLink.apps &&
                        footerLink.apps.map((app) => (
                          <li key={app.serial}>
                            <Link to={``} className="footer_app_btn">
                              <Image src={app.name} rounded fluid></Image>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
        <Row>
          <Image
            className="footer_logo_brand"
            src="/images/logo_text_only_white.png"
            fluid
          ></Image>
        </Row>
        <hr />
        <Row>
          <Col className="commom_footer_styles py-3">
            Copyright &copy; 2022 DaanSadaqah | Part of LynOrg Inc.
          </Col>
          <Col className="commom_footer_styles footer_right_panel py-3">
            <Link to={``} className="px-5">
              Privacy Policy
            </Link>
            <Link to={``} className="px-5">
              Terms of Use
            </Link>
          </Col>
        </Row>
      </Container>
    );

    return footerDesign;
  };

  componentDidMount() {
    this.getFooterData();
  }

  render() {
    const footerDesign = this.getFooterDesign();

    return <footer>{footerDesign}</footer>;
  }
}

export default Footer;
