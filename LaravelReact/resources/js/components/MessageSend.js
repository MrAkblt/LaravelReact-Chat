import React, { Component } from 'react';

export default class MessageSend extends React.Component{
  render(){
    return(
      <form onSubmit={this.props.sendMessage.bind(this)}>
        <input type="text" id="message"></input>
        <button id='gonder' onClick={this.props.sendMessage.bind(this)}>Gönder</button>
      </form> 
    );
  }
}
