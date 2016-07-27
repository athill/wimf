import React from 'react';
import { Col, Row, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchContainers } from '../../../actions/containers';
import { Icon } from '../../common/common';
import AddContainerButton from './AddContainerButton';

const Container = ({editClickHandler = e => e, deleteClickHandler = e => e,  container }) => (
    <Panel className='container'>
        <Row>
            <Col xs={12} sm={6} md={5} lg={5} key={container.name} className='name'>Name: { container.name }</Col>
            <Col xs={12} sm={6} md={5} lg={5} key={container.description} className='description'>Description: { container.desription }</Col>
            <Col xs={12} sm={12} md={2} lg={2} key='controls' className='controls'>
                <Icon icon='edit' title={`Edit ${container.name}`} onClick={e => deleteClickHandler(container)} />
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
    	const { containers } = this.props;
        return (<div>
            	<Link to="/">Home</Link>
            	<h2>Containers</h2>
            	<div id="containers">
            	{
            		containers.items.map(container => (
            			<Container container={container} />
            		))
            	}
            	</div>
                <AddContainerButton />
        	</div>
        );
    }
}

export default connect(mapStateToProps)(Containers);