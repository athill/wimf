import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchContainers } from '../../actions/containers';
import AddForm from './AddForm'
import Container from './Container'

function mapStateToProps(state) {
  return { containers: state.containers }
}


@connect(mapStateToProps)
class Wimf extends React.Component {
    componentDidMount()  {
    	const {dispatch} = this.props;
    	dispatch(fetchContainers());
    }

  render() {
    let {containers} = this.props;

    console.log(this.props, this.props);

    return (
      <Container>
        <AddForm />
	       <select>
	      	{
	      		containers.items.map(container => {
              const selected = container.id === containers.selected.id;
	      			return (
                <option selected={selected} value={container.id}>
                  { container.name }
                </option>
              );
	      		})
	      	}
	      </select>  
      </Container>
    );
  }
}

export default Wimf;