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


class Containers extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    	const {dispatch} = this.props;
    }
    render() {
        return <div>Containers <Link to="/">Home</Link></div>;
    }
}

export default connect(mapStateToProps)(Containers);