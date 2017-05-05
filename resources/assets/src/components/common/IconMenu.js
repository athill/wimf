/**
 * Props: http://fauntleroy.github.io/react-simple-dropdown/
 */

import React from 'react';
import { findDOMNode } from 'react-dom';

export const MenuItem = ({ children, onClick }) => (
  <li onClick={onClick}>{children}</li>
);


export default class  Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
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

    const style = { display: active ? 'block' : 'none' };

    return (
      <div className={className}>
        <span ref="trigger" className={`${className}-trigger`} onClick = { event => this._onToggleClick( event ) }>{ triggerLabel }</span>
        <ul className={`${className}-menu`} style={style}>
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


