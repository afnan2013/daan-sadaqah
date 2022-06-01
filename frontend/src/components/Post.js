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
                            <Card>Category - {post.categoryCode}</Card>
                        </Col>
                        <Col md={9}>
                            <Card>
                                <div>Age: {post.age}</div> 
                                <div>Sender: {post.postAuthor}</div> 
                                <div>Story Line: {post.storyLine}</div> 
                                <div>Post Verified: {post.postVerified ? 'Yes' : 'No'}</div> 
                                <div>Fund Amount: {post.fundAmount}</div> 

                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <Card>100 views</Card>
                        </Col>
                        <Col md={9}>
                            <ProgressBar now={(post.fundRaisedAmount/post.fundAmount)*100} label={`Collected ${(post.fundRaisedAmount/post.fundAmount)*100}%`} />
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