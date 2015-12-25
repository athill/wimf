import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchContainersIfNeeded } from '../../actions/containers';

function mapStateToProps(state) {
  return { containers: state.containers }
}


@connect(mapStateToProps)
class Wimf extends React.Component {
    componentDidMount()  {
    	const {dispatch} = this.props;
    	dispatch(fetchContainersIfNeeded());
    }

  render() {
    let {containers} = this.props;

    console.log(containers, Array.isArray(containers));

    if (!Array.isArray(containers)) {
    	containers = containers.containers;
    }

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