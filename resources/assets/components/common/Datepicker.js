import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//// styles
import 'react-datepicker/dist/react-datepicker.css';

//// components
import ValidatedInput from './ValidatedInput';

/****

readonly 
validate
convert on submit/read
*/

export default class Datepicker extends React.Component {
	constructor() {
		super();
		this._handleChange = this._handleChange.bind(this);
		this.state = {
			startDate: moment()
		}
	}	

	componentWillMount() {
		const { value } = this.props;
		if (value) {
			this.setState({
				startDate: value
			});
		}
	}

	_handleChange(date) {
		this.setState({
			startDate: date
		});
	}

	render() {
		const { label, help, hasFeedback, bsStyle, labelClassName, wrapperClassName, readOnly, ...field } = this.props;
		const datepicker = readOnly ?
								'foo' :
								<DatePicker {...field}
									selected={this.state.startDate} readOnly={readOnly}
									onChange={this._handleChange} />;
		return (
			<ValidatedInput type={undefined} label={label} help={help} hasFeedback={hasFeedback}
					labelClassName={labelClassName} wrapperClassName={wrapperClassName}
					readOnly={readOnly}>
				{ datepicker }
			</ValidatedInput>
		);
	}  
}