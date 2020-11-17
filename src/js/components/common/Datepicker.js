import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//// styles
import 'react-datepicker/dist/react-datepicker.css';

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

	componentDidUpdate(prevProps) {
		const initialMoment = momentize(prevProps.initialValue).startOf('day'),
			nextInitialMoment = momentize(this.props.initialValue).startOf('day');
		if (this.props.initialValue && 
				(!prevProps.initialValue || !initialMoment.isSame(nextInitialMoment))) {
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
		const { label, help, name, readOnly, ...field } = this.props;
		const displayValue = getDisplayFormat(field.input.value);
		//// native datepicker
		if (Compatibility.isDateSupported()) {
			field.input.value = readOnly ?  displayValue : getIsoFormat(field.input.value);
			return <ValidatedInput {...field} type='date' label={label} help={help} 
					componentClass={'input'} 
					readOnly={readOnly} />;
		//// no native datepicker
		} else {
			return (
				<ValidatedInput {...field} type='text' name={name} label={label} help={help} componentClass={DatePicker}
						readOnly={readOnly} value={displayValue} selected={field.input.value ? momentize(field.input.value) : null } />
			);
		}
	}  
}