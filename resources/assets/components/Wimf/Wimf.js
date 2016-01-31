import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//// actions
import { fetchContainers } from '../../actions/containers';
import { fetchUserInfo } from '../../actions/user';
//// components
import AddForm from './AddForm'
import Container from './Container'



function mapStateToProps({containers, addForm: { show : showAddForm }}) {
  return { 
    containers,
    showAddForm
  }
}


@connect(mapStateToProps)
class Wimf extends React.Component {
  componentDidMount()  {
  	const {dispatch} = this.props;
    dispatch(fetchContainers());
    dispatch(fetchUserInfo());
  }

  render() {
    const {containers, showAddForm} = this.props;
    return (
      <div>

          { showAddForm && <AddForm /> }
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
          <Container />
      </div>
    );
  }
}

export default Wimf;