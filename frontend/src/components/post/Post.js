import React from 'react';
import { Card, Row, Col, ProgressBar, Image, Button } from 'react-bootstrap';
import ReadMore from './ReadMore';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sympathyIcon: '/images/transparent 1-01 (1).png',
      isChecked: false,
    };

    this.unchekedSympqathyIcon = '/images/transparent 1-01 (1).png';
    this.chekedSympqathyIcon = '/images/transparent 2-01-01 (1).png';
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  toggleSympathyIcon = (isChecked) => {
    if (isChecked === false) {
      // console.log("Checked")
      this.setInputValue('sympathyIcon', this.chekedSympqathyIcon);
    } else {
      this.setInputValue('sympathyIcon', this.unchekedSympqathyIcon);
    }
    this.setInputValue('isChecked', !this.state.isChecked);
  };

  render() {
    const posts = this.props.posts;

    return (
      <Row className="account_container">
        {posts &&
          posts.length !== 0 &&
          posts.map((post) => (
            <Card key={post.id} className="post_card">
              <Row>
                <Col md={2}>
                  <div className="d-flex py-2">
                    <Image
                      src="/images/passport-sample.jpg"
                      className="post_author_image"
                    ></Image>

                    <div>
                      <h4>Afnan</h4>
                      <p>Mohakhali</p>
                      <p>Dhaka</p>
                    </div>
                  </div>
                </Col>
                <Col md={8}>
                  <Card>
                    <h4>Title: {post.shortTitle}</h4>
                    <ReadMore maxCharacterCount={200}>
                      Story: It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for 'lorem ipsum' will
                      uncover many web sites still in their infancy. Various
                      versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).Contrary to popular belief, Lorem Ipsum is not
                      simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years
                      old. Richard McClintock, a Latin professor at
                      Hampden-Sydney College in Virginia, looked up one of the
                      more obscure Latin words, consectetur, from a Lorem Ipsum
                      passage, and going through the cites of the word in
                      classical literature, discovered the undoubtable source.
                      Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                      Finibus Bonorum et Malorum" (The Extremes of Good and
                      Evil) by Cicero, written in 45 BC. This book is a treatise
                      on the theory of ethics, very popular during the
                      Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
                      dolor sit amet..", comes from a line in section 1.10.32.
                    </ReadMore>
                  </Card>
                </Col>
                <Col md={2}>
                  <Button variant="success" className="w-100">
                    Donate
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <div>Category - {post.categoryname}</div>
                  <div>Amount - {post.fundamount}</div>
                </Col>
                <Col md={8}>
                  <img src="/images/slider-1.jpg" className="form_image" />
                  <img src="/images/slider-2.jpg" className="form_image" />
                  <img src="/images/slider-3.jpg" className="form_image" />
                </Col>
                <Col md={2}>
                  <div className="text-center">
                    <img
                      src={this.state.sympathyIcon}
                      onClick={() => {
                        this.toggleSympathyIcon(this.state.isChecked);
                      }}
                      className="post_author_image"
                    ></img>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <Button className="w-100">100 views</Button>
                </Col>
                <Col>
                  <div className="progress">
                    <div
                      role="progressbar"
                      className="progress-bar"
                      aria-valuenow={post.collectedPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${post.collectedPercentage}%` }}
                    >
                      Collected {post.collectedPercentage}%
                    </div>
                    <p className="text-center w-100" style={{ color: 'white' }}>
                      Need More {100 - post.collectedPercentage}%
                    </p>
                  </div>
                </Col>
                <Col md={2}>
                  <Button className="w-100">Shortlist</Button>
                </Col>
              </Row>
            </Card>
          ))}
      </Row>
    );
  }
}

export default Post;
