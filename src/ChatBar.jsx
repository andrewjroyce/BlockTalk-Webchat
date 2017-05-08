import React, {Component} from 'react';

class ChatBar extends Component {
  render(){
    return(
      <footer className="chatbar">
        <input onChange={this.changeName} className="chatbar-username" placeholder='choose a name' />
        <input onKeyPress={this.props.keyPressed} className="chatbar-message" placeholder="Hit Enter" />
      </footer>
    )
  }
}
export default ChatBar