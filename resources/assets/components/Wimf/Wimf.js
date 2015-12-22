import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchContainersIfNeeded } from '../../actions/containers';


@connect(({ containers }) => ({ containers }))
class Wimf extends React.Component {
    componentDidMount()  {
    	const {dispatch} = this.props;
    	dispatch(fetchContainersIfNeeded());
    }

  render() {
    const {containers} = this.props;
    
    return (
      <div>
        Hello world!
	      <select>
	      	{
	      		containers.map(container => {
	      			return <option>{ container.name }</option>;
	      		})
	      	}
	      </select>        
      </div>
    );
  }
}

export default Wimf;