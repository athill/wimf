import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchContainers } from '../../../actions/containers';

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

const Container = ({ container }) => (
	<li>
		<div>
			<div>Name: { container.name }</div>
			<div>Description: { container.desription }</div>
		</div>
	</li>
);


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