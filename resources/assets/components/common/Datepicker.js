import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//// styles
import 'react-datepicker/dist/react-datepicker.css';

//// components
import ValidatedInput from './ValidatedInput';

//// utils
import { getDisplayFormat } from '../../util/DateUtils';

/****
validate
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
		const { initialValue } = this.props;
		if (initialValue) {
			this.setState({
				startDate: initialValue
			});
		}
	}

	_handleChange(date) {
		this.setState({
			startDate: date
		});
	}

	render() {
		console.log(this.props);
		const { label, help, hasFeedback, bsStyle, labelClassName, wrapperClassName, readOnly, ...field } = this.props;
		const datepicker = readOnly ?
								field.initialValue :
								<DatePicker {...field}
									selected={this.state.startDate}
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