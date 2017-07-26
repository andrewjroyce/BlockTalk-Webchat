import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user,
      input: ''
    };

    this.changeName = this.changeName.bind(this);
    this.submitName = this.submitName.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }

  changeName(event) {
    this.setState({name: event.target.value});
  }

  changeInput(event) {
    this.setState({input: event.target.value});
  }

  submitInput(event) {
    if(event.key == 'Enter'){
      this.props.submitMessage(this.state.input);
      this.setState({input: ""});
      }
    if(!this.state.name){
      this.setState({name: 'Anon'})
    }
  }

  submitName(event) {
    if(event.key == 'Enter'){
      if(!this.state.name){
        this.setState({name: 'Anonymous'})
      }
    this.props.submitName(this.state.name);
    }
  }


  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.name} onChange={this.changeName} onKeyPress={this.submitName}/>
        <input className="chatbar-message"  placeholder="Type a message and hit ENTER" value={this.state.input} onChange={this.changeInput} onKeyPress={this.submitInput} />
      </footer>
    )
  }
}
export default ChatBar