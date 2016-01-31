import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//// actions
import { fetchContainers } from '../../actions/containers';
import { fetchUserInfo } from '../../actions/user';
import { getPage } from '../../actions/page';
//// components
import AddForm from './AddForm'
import Container from './Container'



function mapStateToProps(state) {
  return { 
    containers: state.containers 
  }
}


@connect(mapStateToProps)
class Wimf extends React.Component {
  componentDidMount()  {
  	const {dispatch} = this.props;
  	dispatch(getPage());
    dispatch(fetchContainers());
    dispatch(fetchUserInfo());
  }

  render() {
    let {containers} = this.props;

    console.log(containers);
    return (
      <div>

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
          <Container />
      </div>
    );
  }
}

export default Wimf;