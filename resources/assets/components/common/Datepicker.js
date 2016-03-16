import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//// styles
import 'react-datepicker/dist/react-datepicker.css';

//// components
import ValidatedInput from './ValidatedInput';

//// utils
import Compatibility from '../../util/Compatibility';
import { momentFormats, momentize, getIsoFormat, getDisplayFormat } from '../../util/DateUtils';


/****
validate
*/

export default class Datepicker extends React.Component {
	constructor() {
		super();
		this._handleChange = this._handleChange.bind(this);
		this.state = {
			startDate: ''
		}
	}	

	componentWillReceiveProps(nextProps) {
		const initialMoment = momentize(this.props.initialValue, momentFormats).startOf('day'),
			nextInitialMoment = momentize(nextProps.initialValue, momentFormats).startOf('day');
		if (nextProps.initialValue && 
				(!this.props.initialValue || !initialMoment.isSame(nextInitialMoment))) {
			this.setState({
				startDate: nextInitialMoment
			});
		}
	}

	_handleChange(date) {
		console.log('date', date);
		const { onChange } = this.props;
		onChange(getIsoFormat(date));
		this.setState({
			startDate: date
		});
	}

	render() {
		const { label, help, hasFeedback, bsStyle, labelClassName, wrapperClassName, readOnly, ...field } = this.props;
		if (Compatibility.isDateSupported()) {
			var value = readOnly ?  getDisplayFormat(field.initialValue) : getIsoFormat(this.state.startDate);
			console.log(value);
			return <ValidatedInput {...field} type='date' label={label} help={help} hasFeedback={hasFeedback}
					labelClassName={labelClassName} wrapperClassName={wrapperClassName}
					readOnly={readOnly} value={value} onChange={e => this._handleChange(momentize(e.target.value))} />;
		} else {
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
}