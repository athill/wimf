import React from 'react';

import BootstrapContainer from './common/BootstrapContainer';
import AppNavbar from './AppNavbar';

const App = ({children}) => (
	<div>
		<AppNavbar />
        <BootstrapContainer>
        {children}
		</BootstrapContainer> 		
	</div>
);
App.displayName = 'App';

export default App;
