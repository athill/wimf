import React from 'react';

const BootstrapContainer = ({ children }) => (
	<main>
		<div className="container">
			<div className="col-md-10">
				{ children }
			</div>
		</div>
	</main>
);

export default BootstrapContainer;