import React from 'react';
import { Alert, Col, Grid, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { importData } from '../../../modules/containers';

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (file) => {
      dispatch(importData(file));
    },
  };
};

const mapStateToProps = ({ containers: { importFormError } }) => {
	return {
		error: importFormError
	};
};

class Import extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
		file:null
		}
		this.onChange = this.onChange.bind(this)
	}
	onChange(e) {
		this.setState({file:e.target.files[0]})
	}	
	render() {
		const { error, onSubmit } = this.props;
		return (
			<Grid fluid>
				<Row>
					<Col md={8} mdOffset={2}>
						<Panel header="Import" bsStyle="default">
							{ error && <Alert bsStyle='danger'>  { error } </Alert> }
							<form className="form-inline" onSubmit={e => { e.preventDefault(); onSubmit(this.state.file)}}>
		 
								<label className="btn btn-default">
								    Upload File:  <input name="importer" type="file" hidden onChange={this.onChange} />
								</label>	    
							  <button type="submit" className="btn btn-default">Submit</button>
							</form>
						</Panel>
					</Col>
				</Row>
			</Grid>
		)
	}
};



// action="" method="post"  enctype="multipart/form-data"

export default connect(mapStateToProps, mapDispatchToProps)(Import);