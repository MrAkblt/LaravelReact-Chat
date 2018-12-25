import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageList from "./MessageList";
import openSocket from 'socket.io-client';

var socket;
var ipPort = 'http://192.168.1.22:1337';
export default class Example extends Component {

  constructor() {
    super();
    this.state = {
      messageList: [],
      checkNickname: '',
      show: false
    }

  }
  connDB(e) {
    e.preventDefault();
    let nickname = document.getElementById('nickname').value;
    if (socket) socket.close();
    socket = openSocket(ipPort);
    socket.emit('nickname', nickname);
    socket.on('message', (msg) => {
      this.setState({ messageList: [...this.state.messageList, msg] })
    })
    socket.on('checkNickname', (msg) => {
      if (msg == 'Bağlandınız') { this.setState({ show: true }) }
      else { this.setState({ show: false }) }
      this.setState({ checkNickname: msg });
    })
  }

  sendMessage(e) {
    e.preventDefault();
    let messageElem = document.getElementById('message');
    socket.send(messageElem.value);
    messageElem.value='';
  }

  render() {
    return (
      <div>

        {/* {!this.state.show ?
          <div className="Giris">
            <input id="nickname" type="text" placeholder="Enter your nickname"></input>
            <button id="baglan" onClick={this.connDB.bind(this)}>Bağlan</button>
            <label id="check">{this.state.checkNickname}</label><br /><br />
          </div>
          : null
        } */}
        {!this.state.show ?
          <form onSubmit={this.connDB.bind(this)}>
            <div class="input-group mb-3">
              <input id='nickname' type="text" class="form-control" placeholder="Nickname Giriniz" aria-label="Nickname Giriniz" aria-describedby="baglan" />
              <div class="input-group-append">
                <button id='baglan' class="btn btn-outline-secondary" type="button" onClick={this.connDB.bind(this)}>Bağlan</button>
              </div>
            </div>
            <label id="check">{this.state.checkNickname}</label>
          </form>
          : null
        }

        {this.state.show ?
          <div class="Chat">
            <div class="d-flex align-items-end" style={{height:'95vh'}}>
              <MessageList messageList={this.state.messageList}></MessageList>
            </div>
                <form onSubmit={this.sendMessage.bind(this)}>
                  <div class="input-group mb-3">
                    <input id='message' type="text" class="form-control" placeholder="Mesajınızı Giriniz" aria-label="Mesajınızı Giriniz" aria-describedby="gonder" />
                    <div class="input-group-append">
                      <button id='gonder' class="btn btn-primary" type="button" onClick={this.sendMessage.bind(this)}>Gönder</button>
                    </div>
                  </div>
                </form>
          </div>
          : null
        }
      </div>
    );
  }
}

if (document.getElementById('example')) {
  ReactDOM.render(<Example />, document.getElementById('example'));
}
