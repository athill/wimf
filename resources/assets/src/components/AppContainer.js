import React from 'react';

const AppContainer = ({ children }) => (
	<main>
		<div className="container">
			<div className="col-md-12">
				{ children }
			</div>
		</div>
	</main>
);

AppContainer.displayName = 'AppContainer';

export default AppContainer;