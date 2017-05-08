import React, {Component} from 'react';

class Nav extends Component {
  render(){
    var counted;
    counted = this.props.userChange
    return(
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
         <div className="userChange">{counted} users online</div>
      </nav>
    )
  }
}
export default Nav;