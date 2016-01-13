import React from 'react';

const Container = ({ children }) => (
	<main>
		<div className="container">
			<div className="col-md-10">
				{ children }
			</div>
		</div>
	</main>
);

export default Container;