import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//// actions
import { fetchContainers } from '../../actions/containers';
import { fetchUserInfo } from '../../actions/user';
//// components
import AddForm from './AddForm'
import ContainerSelector from './ContainerSelector';
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
          <ContainerSelector containers={containers} />
          <Container />
      </div>
    );
  }
}

export default Wimf;