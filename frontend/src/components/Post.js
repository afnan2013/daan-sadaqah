import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";


class Post extends React.Component {
    constructor(props){
        super(props);  

        this.state = {
            sympathyIcon: '/images/transparent 1-01.png',
            isChecked:false
        };

        this.unchekedSympqathyIcon = '/images/transparent 1-01.png';
        this.chekedSympqathyIcon = '/images/transparent 2-01-01.png';
    }

    setInputValue(property, val) {
        this.setState({
          [property]: val,
        });
      }

      
    toggleSympathyIcon= (isChecked)=>{
        
        if(isChecked === true){
            // console.log("Checked")
            this.setInputValue("sympathyIcon", this.chekedSympqathyIcon)
            
        }else{
            this.setInputValue("sympathyIcon", this.unchekedSympqathyIcon)
        }
        this.setInputValue("isChecked", !this.state.isChecked)
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
                        <Col md={6}>
                            <ProgressBar now={post.collectedPercentage} label={`Collected ${post.collectedPercentage}%`} />
                        </Col>
                        <Col md={4}>
                            
                            <img src={this.state.sympathyIcon} width="200px" onClick={() => {this.toggleSympathyIcon(this.state.isChecked)}}></img>
     
                            
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