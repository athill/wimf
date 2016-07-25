import React from 'react';

import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'

import BootstrapContainer from './common/BootstrapContainer';
import WimfNavbar from './Wimf/WimfNavbar';

//// modules
import Wimf from './Wimf/Wimf';
import Containers from './Wimf/modules/Containers';


const App = () => (
	<div>
		<WimfNavbar />
        <BootstrapContainer>
		  <Router history={hashHistory}>
		    <Route path="/" component={Wimf}>
		    	<Route path="/containers" component={Containers}/>
		    </Route>
		  </Router>
		</BootstrapContainer> 
	</div>
);

export default App;