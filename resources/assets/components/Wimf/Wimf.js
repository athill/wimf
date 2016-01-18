import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchContainers } from '../../actions/containers';
import { fetchUserInfo } from '../../actions/user';
import AddForm from './AddForm'
import Container from './Container'
import BootstrapContainer from './BootstrapContainer'
import WimfNavbar from './WimfNavbar';

function mapStateToProps(state) {
  return { containers: state.containers }
}


@connect(mapStateToProps)
class Wimf extends React.Component {
    componentDidMount()  {
    	const {dispatch} = this.props;
    	dispatch(fetchContainers());
      dispatch(fetchUserInfo());
    }

  render() {
    let {containers} = this.props;

    console.log(containers);
    return (
      <div>
        <WimfNavbar />
        <BootstrapContainer>
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
        </BootstrapContainer>
      </div>
    );
  }
}

export default Wimf;