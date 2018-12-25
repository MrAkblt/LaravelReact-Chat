import React from "react";
export default class MessageList extends React.Component{
  renderList(){
    return this.props.messageList.map((value,i)=>
    <li key={i}>{value}</li> );
  }
  render(){
    return(
      <ul>
        {this.renderList()}
      </ul>
    );
  }
}