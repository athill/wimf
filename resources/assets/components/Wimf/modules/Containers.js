import React from 'react';
import { Col, Row, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchContainers } from '../../../actions/containers';
import { Icon } from '../../common/common';

const Container = ({editClickHandler = e => e, deleteClickHandler = e => e,  container }) => (
    <li>
        <Well className='container'>
            <Row>
                <Col xs={12} sm={6} md={5} lg={5} key={container.name} className='name'>Name: { container.name }</Col>
                <Col xs={12} sm={6} md={5} lg={5} key={container.description} className='description'>Description: { container.desription }</Col>
                <Col xs={12} sm={12} md={2} lg={2} key='controls' className='controls'>
                    foo
                    <Icon icon='edit' title={`Edit ${container.name}`} onClick={e => deleteClickHandler(container)} />
                    <Icon icon='remove' title={`Delete ${container.name}`} onClick={e => deleteClickHandler(container)} />
                </Col>
            </Row>
        </Well>
    </li>
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
        	<ul>
        	{
        		containers.items.map(container => (
        			<Container container={container} />
        		))
        	}
        	</ul>
        	</div>
        );
    }
}

export default connect(mapStateToProps)(Containers);