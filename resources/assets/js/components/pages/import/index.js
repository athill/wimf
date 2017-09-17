import React from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';

const Import = () => (
	<Grid fluid>
		<Row>
			<Col md={8} mdOffset={2}>
				<Panel header="Import" bsStyle="default">
					<form className="form-inline" action="" method="post"  enctype="multipart/form-data">
 
						<label className="btn btn-default">
						    Upload File:  <input name="importer" type="file" hidden />
						</label>	    
					  <button type="submit" className="btn btn-default">Submit</button>
					</form>
				</Panel>
			</Col>
		</Row>
	</Grid>
);

export default Import;