import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//// styles
// import 'react-datepicker/dist/react-datepicker.css';

//// components
import ValidatedInput from './ValidatedInput';

//// utils
import Compatibility from '../../util/Compatibility';
import { momentize, getIsoFormat, getDisplayFormat } from '../../util/DateUtils';


export default class Datepicker extends React.Component {
	constructor() {
		super();
		this._handleChange = this._handleChange.bind(this);
		this.state = {
			startDate: moment()
		}
	}	

	componentWillReceiveProps(nextProps) {
		const initialMoment = momentize(this.props.initialValue).startOf('day'),
			nextInitialMoment = momentize(nextProps.initialValue).startOf('day');
		if (nextProps.initialValue && 
				(!this.props.initialValue || !initialMoment.isSame(nextInitialMoment))) {
			this.setState({
				startDate: nextInitialMoment
			});
		}
	}

	_handleChange(date) {
		const { onChange } = this.props;
		onChange(getIsoFormat(date));
		this.setState({
			startDate: date
		});
	}

	render() {
		const { label, help, hasFeedback, labelClassName, wrapperClassName, readOnly, ...field } = this.props;
		const displayValue = getDisplayFormat(field.initialValue);
		//// native datepicker
		if (Compatibility.isDateSupported()) {
			const value = readOnly ?  displayValue : getIsoFormat(this.state.startDate);
			return <ValidatedInput {...field} type='date' label={label} help={help} hasFeedback={hasFeedback}
					labelClassName={labelClassName} wrapperClassName={wrapperClassName}
					readOnly={readOnly} value={value} onChange={e => this._handleChange(momentize(e.target.value))} />;
		//// no native datepicker
		} else {
			const datepicker = readOnly ?
									displayValue :
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