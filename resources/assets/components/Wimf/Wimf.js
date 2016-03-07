import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//// actions
import { fetchContainers } from '../../actions/containers';
import { fetchUserInfo } from '../../actions/user';
//// components
import AddItemButton from './AddItemButton'
import ItemForm from './ItemForm'
import ContainerSelector from './ContainerSelector';
import Container from './Container'



function mapStateToProps({containers}) {
  return { 
    containers
  }
}



class Wimf extends React.Component {
  componentDidMount()  {
  	const {dispatch} = this.props;
    dispatch(fetchContainers());
    dispatch(fetchUserInfo());
  }

  render() {
    const {containers} = this.props;
    return (
      <div>
          <ItemForm /> 
          <ContainerSelector containers={containers} />
          <Container />
          <AddItemButton />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Wimf);