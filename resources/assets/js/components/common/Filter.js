import PropTypes from 'prop-types';
import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { Icon } from './common';

class Filter extends React.Component {
	constructor(props) {
		super(props);

		this.textInput = React.createRef();

		this._handleChange = this._handleChange.bind(this);
		this._clear = this._clear.bind(this);
		this.state = {
			value: ''
		}
	}

	componentDidMount() {
		this.textInput.current.focus();
	} 

	_handleChange(e) {
		const value = e.target.value;
		this.setState({
			value
		})
		this.props.handleChange(value);
	}

	_clear() {
		this.setState({
			value: ''
		})
		this.props.handleChange('');
		// console.log(this.textInput.current)
		this.textInput.current.focus();	
	}

	render() {
		return (
			<Form horizontal onSubmit={ e => e.preventDefault() }>
				<FormGroup className="item-filter" controlId="items-filter">
					<InputGroup>
						<InputGroup.Addon>Filter:</InputGroup.Addon>
						<FormControl value={this.state.value} autoFocus inputRef={ this.textInput }
							onChange={this._handleChange}  />
						<InputGroup.Button>
							<Button onClick={this._clear}>
								<Icon icon='times-circle' />
							</Button>
						</InputGroup.Button>
					</InputGroup>
				</FormGroup>
			</Form>
		);
	}
}

Filter.displayName = 'Filter';
Filter.propTypes = {
	handleChange: PropTypes.func
};
/*
				<ControlLabel className="col-xs-2">Filter:</ControlLabel>
				<div className='col-xs-10'>
					<FormControl type='text' componentClass="input"
						onChange={e => handleChange(e.target.value)} />
				</div>
*/
export default Filter;