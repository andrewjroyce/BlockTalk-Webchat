import React, {Component} from 'react';

class Message extends Component {
  render() {
    // console.log(Message);
    return(
      <div className="message">
        <div className="message-username">{this.props.username}</div>
        <div className="message-content">{this.props.content}</div>
        
      </div>
    )
  }
}
export default Message;