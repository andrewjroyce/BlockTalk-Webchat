import React, {Component} from 'react';

class Nav extends Component {
  render(){
    return(
      <nav className="navbar">
        <a href="/" className="navbar-brand">BlockTalk</a>
        <span className="userChange">{this.props.userCount} users online</span>
      </nav>
    )
  }
}
export default Nav;