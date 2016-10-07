import React from 'react';

import BootstrapContainer from './common/BootstrapContainer';
import WimfNavbar from './Wimf/WimfNavbar';


// const App = ({children}) => (
// 	<div>
// 		<WimfNavbar />
//         <BootstrapContainer>
//         {children}
// 		</BootstrapContainer> 
// 	</div>
// );

const App = ({children}) => {
	return (
		<div>
			Up and running
			<WimfNavbar />
		</div>
	)
};

export default App;