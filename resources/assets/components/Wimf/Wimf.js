import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchContainersIfNeeded } from '../../actions/containers';
import AddForm from './AddForm'
import Container from './Container'

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

    console.log(this.props, containers);

    return (
      <Container>
        <AddForm />
	      { /* <select>
	      	{
	      		containers.items.map(container => {
	      			return <option>{ container.name }</option>;
	      		})
	      	}
	      </select>  */ }
      </Container>
    );
  }
}

export default Wimf;