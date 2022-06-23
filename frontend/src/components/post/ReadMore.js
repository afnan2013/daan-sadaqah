import React, { Component } from 'react'

export default class ReadMore extends Component {
    constructor(props){
        super(props);
        this.state = {
            isTruncated: true
        };
    }

    toggleIsTruncated = ()=> {
        this.setState({
            isTruncated: !this.state.isTruncated
        })
    }
  render() {
    const resultString = this.state.isTruncated ? this.props.children.slice(0, this.props.maxCharacterCount) : this.props.children;
    return (
      <p>   
        {resultString}
        <a onClick={this.toggleIsTruncated} className='common_link_hover'>{this.state.isTruncated? "  ...Read More" : "  ...Read Less"}</a>
      </p>
    )
  }
}
