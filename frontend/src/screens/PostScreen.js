import React from "react";
import ScreenContainer from "../components/ScreenContainer";
import {
    Nav,
  } from 'react-bootstrap';

import Post from "../components/Post";
import {apiCall} from '../utils/apiCall';

class PostScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          postLists: [],
          postCategoryLists: []
        }
        this.onPostCategoryHandler = this.onPostCategoryHandler.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
        this.getPostsCategory = this.getPostsCategory.bind(this);
    }


    setInputValue(property, val) {
      this.setState({
          [property]: val
      })
    }

    onPostCategoryHandler = async (path)=>{
      try{
        console.log(`/api${path}`);
        const {data} = await apiCall({
          method: 'get',
          URL: `/api${path}`,
        });
        console.log(data);
        this.setInputValue('postLists', data);
      }catch(err){
        console.error(err);
      }
    }

    getPostsCategory = async ()=> {
      try{
        const {data} = await apiCall({
          method: 'get',
          URL: '/api/postCategories',
        });
        console.log(data);

        this.setInputValue("postCategoryLists", data)
      }catch(err){
        console.error(err);
      }

    }

    componentDidMount(){
      this.getPostsCategory();
    }

    render(){
        return(
            <ScreenContainer>
                <Nav
                  className="ms-auto"
                >   
                    <Nav.Link className="" onClick={()=> this.onPostCategoryHandler('/posts')}>
                      <span>All</span>
                    </Nav.Link>
              
                    <Nav.Link className="" onClick={()=> this.onPostCategoryHandler('/posts/newest')}>
                      <span>Newest</span>
                    </Nav.Link>
                    
                    
                    <Nav.Link className="" onClick={()=> this.onPostCategoryHandler('/posts/urgent')}>
                      <span>Urgent</span>
                    </Nav.Link>
                    
                    {this.state.postCategoryLists && this.state.postCategoryLists.length !== 0 && 
                      this.state.postCategoryLists.map((cat)=>(
                      
                        <Nav.Link key={cat.id} className="" onClick={()=> this.onPostCategoryHandler(`/${cat.postFetchingPath}`)}>
                          <span>{cat.categoryName}</span>
                        </Nav.Link>
                    ))}

                      
        
                </Nav>
                
                {this.state.postLists && this.state.postLists.length !== 0 &&
                      
                        (<Post posts={this.state.postLists}/>)}

            </ScreenContainer>
        )
    }
}

export default PostScreen;