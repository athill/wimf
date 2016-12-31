import React from 'react';

import AppContainer from './common/AppContainer';
import AppNavbar from './AppNavbar';

const App = ({children}) => (
	<div>
		<AppNavbar />
        <AppContainer>
        {children}
		</AppContainer> 		
	</div>
);
App.displayName = 'App';

export default App;
