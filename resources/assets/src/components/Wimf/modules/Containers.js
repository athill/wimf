import React from 'react';
import { Col, Row, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//// actions
import { fetchContainers } from '../../../redux/modules/containers';
import { showDeleteContainerForm, showEditContainerForm, toggleAddContainerForm } from '../../../redux/modules/containerForm';


import { Icon } from '../../common/common';
import AddContainerButton from './AddContainerButton';
import ContainerForm from './ContainerForm';

const Container = ({editClickHandler = e => e, deleteClickHandler = e => e,  container }) => (
    <Panel className='container'>
        <Row>
            <Col xs={12} sm={2} md={2} lg={2} key={container.name} className='name'>Name: { container.name }</Col>
            <Col xs={12} sm={8} md={8} lg={8} key={container.description} className='description'>Description: { container.description }</Col>
            <Col xs={12} sm={2} md={2} lg={2} key='controls' className='controls'>
                <Icon icon='edit' title={`Edit ${container.name}`} onClick={e => editClickHandler(container)} />
                <Icon icon='remove' title={`Delete ${container.name}`} onClick={e => deleteClickHandler(container)} />
            </Col>
        </Row>
    </Panel>
);


const mapStateToProps = ({containers}) => {
  return {
    containers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    containerAddClickHandler: () => {
      dispatch(toggleAddContainerForm());
    },    
    containerEditClickHandler: (container) => {
      dispatch(showEditContainerForm(container));
    },        
    containerDeleteClickHandler: (container) => {
      dispatch(showDeleteContainerForm(container));
    },        
    dispatch
  };
};






class Containers extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    	const {dispatch} = this.props;
    	dispatch(fetchContainers());
    }
    render() {
    	const { containers, containerAddClickHandler, containerEditClickHandler, containerDeleteClickHandler } = this.props;
        return (<div>
            	<Link to="/">Home</Link>
            	<h2>Containers</h2>
            	<div id="containers">
            	{
            		containers.items.map(container => (
            			<Container key={container.id} container={container}
                            editClickHandler={containerEditClickHandler}
                            deleteClickHandler={containerDeleteClickHandler} />
            		))
            	}
            	</div>
                <AddContainerButton clickHandler={containerAddClickHandler} />
                <ContainerForm />
        	</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Containers);