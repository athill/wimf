/**
 * Props: http://fauntleroy.github.io/react-simple-dropdown/
 */

import React from 'react';
import { findDOMNode } from 'react-dom';

const menuItemStyle = {
  margin: 0,
  padding: '0.3em',
};
export const MenuItem = ({ children, onClick }) => (
  <li onClick={onClick} style={menuItemStyle}>{children}</li>
);

const parentStyle = {
  position: 'relative', 
  display: 'inline-block',
  zIndex: '9000'
};



export default class  Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }

    this.menuStyle = { 
      display: this.state.active ? 'block' : 'none', 
      position: 'absolute', 
      top: '20px', 
      right: 0,
      backgroundColor: '#EEE',
      border: 'thin solid black',
      listStyle: 'none',
      margin: 0,
      padding: 0      
    } 

    this._onWindowClick = this._onWindowClick.bind(this);
    this._onToggleClick = this._onToggleClick.bind(this);
  }

  componentDidMount () {
    window.addEventListener( 'click', this._onWindowClick );
    window.addEventListener( 'touchstart', this._onWindowClick );
  }

  componentWillUnmount () {
    window.removeEventListener( 'click', this._onWindowClick );
    window.removeEventListener( 'touchstart', this._onWindowClick );
  }

  render () {
    const { children, className, triggerLabel } = this.props;
    // create component classes
    const active = this.isActive();

   this.menuStyle.display = active ? 'block' : 'none';

    return (
      <div style={parentStyle} className={className}>
        <span ref="trigger" onClick = { event => this._onToggleClick( event ) }>{ triggerLabel }</span>
        <ul style={this.menuStyle}>
          { children }
        </ul>      
      </div>
    );
  }

  isActive () {
    return ( typeof this.props.active === 'boolean' ) ?
      this.props.active :
      this.state.active;
  }

  hide () {
    this.setState({
      active: false
    });
    if( this.props.onHide ){
      this.props.onHide();
    }
  }

  show () {
    this.setState({
      active: true
    });
    if( this.props.onShow ){
      this.props.onShow();
    }
  }

  _onWindowClick ( event ) {
    const dropdown_element = findDOMNode( this );
    if( event.target !== dropdown_element && !dropdown_element.contains( event.target ) && this.isActive() ){
      this.hide();
    }
  }

  _onToggleClick ( event ) {
    event.preventDefault();
    if( this.isActive() ){
      this.hide();
    } else {
      this.show();
    }
  }
}


