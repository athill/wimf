import React from 'react';

import { connect } from 'react-redux';

import BootstrapContainer from './Wimf/BootstrapContainer'
import Wimf from './Wimf/Wimf';
import WimfNavbar from './Wimf/WimfNavbar';



const App = () => (
	<div>
		<WimfNavbar />
        <BootstrapContainer>
			<Wimf />
		</BootstrapContainer>
	</div>
);

export default App;