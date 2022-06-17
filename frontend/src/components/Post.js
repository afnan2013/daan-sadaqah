import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";


class Post extends React.Component {
    constructor(props){
        super(props);  
    }

    render(){
        const posts = this.props.posts;
        
        return (
            <>
            {posts && posts.length !== 0 && 
                posts.map((post)=>(
                
                (<Card key={post.id} className="post_card">
                    <Row>
                        <Col md={2}>
                            <Card>Category - {post.categoryname}</Card>
                        </Col>
                        <Col md={9}>
                            <Card>
                                <div>Sender: {post.userid}</div> 
                                <div>Story Line: {post.storyLine}</div> 
                                <div>Post Verified: {post.postVerified ? 'Yes' : 'No'}</div> 
                                <div>Fund Amount: {post.fundamount}</div> 

                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <Card>100 views</Card>
                        </Col>
                        <Col md={9}>
                            <ProgressBar now={post.collectedPercentage} label={`Collected ${post.collectedPercentage}%`} />
                        </Col>
                    </Row>
                </Card>)
                ))
                }
            </>
        )
    }

}

export default Post;