import PropTypes from 'prop-types';
import React from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Icon, NoOp } from './common';

export const InputLabel = ({ error, className, title, warning }) => {
  const message = error || warning;
  if (message) {
    const icon = error ? 'times-circle' : 'exclamation-triangle';
    const tooltip = (<Tooltip id={`${title}ToolTip`} tabIndex={1000}>{message}</Tooltip>);
    return (
      <ControlLabel className={className}>{title} <OverlayTrigger overlay={tooltip}><Icon icon={icon} size="sm" /></OverlayTrigger></ControlLabel>
    );
  } else {
    return <ControlLabel className={className}>{title}</ControlLabel>;
  }
};
InputLabel.displayName = 'InputLabel';
InputLabel.propTypes = {
  error: PropTypes.string,
  title: PropTypes.string.isRequired,
  warning: PropTypes.string
};


const ValidatedInput = ({ children, help, id, input, label, maxLength, meta, mutatedValue, readOnly,  
    componentClass='input', value='', showTextLengthFeedback = false, labelCols = 4, ...otherProps }) => {

  let errorMessage, style, warningMessage;
  if (meta.touched) {
    if (meta.valid) {
      if (meta.warning) {
        warningMessage = meta.warning;
        style = 'warning';
      }
    } else {
      errorMessage = meta.error;
      style = 'error';
    }
  }
  const labelClassName = "col-xs-"+labelCols;
  const wrapperClassName = "col-xs-"+(12-labelCols);
  //const lengthBadge = (<LengthBadge length={value.length} maxLength={maxLength} />);
  const labelComponent = (<InputLabel title={label} warning={warningMessage} error={errorMessage} className={labelClassName} />);
  const errorComponent = meta.touched && meta.error ? <div className='text-danger'>{meta.error}</div> : <NoOp />;
  //const helpNode = <output id={id + "Output"} className="mutated-input">{mutatedValue}</output>;
  if (readOnly) {
    return (
      <FormGroup>
        <input {...otherProps}  type="hidden" />
        <ControlLabel className={labelClassName}>{label}</ControlLabel>
        <div className={wrapperClassName}>
          <FormControl.Static>
              { input.value }
          </FormControl.Static>
        </div>
      </FormGroup>
    );
  } else {
    return (
      <FormGroup>
        {labelComponent}
        <div className={wrapperClassName}>
          <FormControl {...otherProps}
            id={id}
            maxLength={maxLength}
            title={label}
            placeholder={label}
            bsStyle={style}
            componentClass={componentClass}
            {...input}>
              { children }
          </FormControl>
          { help && <HelpBlock>{help}</HelpBlock> }
        </div>
      </FormGroup>       
    );
  }
};

ValidatedInput.displayName = 'ValidatedInput';

ValidatedInput.propTypes = {
  meta: PropTypes.object,
  maxLength: PropTypes.number,
  showTextLengthFeedback: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
};

export default ValidatedInput;
