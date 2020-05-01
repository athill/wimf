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

export const getMessageAndStyle = meta => {
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
  return {
    errorMessage,
    style,
    warningMessage
  }
};

const ErrorMessage = ({ meta }) => {
  return meta.touched && meta.error ? <div className='text-danger'>{meta.error}</div> : null;
} 

export const getClassNames = labelCols => ({
  labelClassName: "col-xs-"+labelCols,
  wrapperClassName: "col-xs-"+(12-labelCols)  
});

const ValidatedInput = ({ children, help, id, input, label, maxLength, meta, mutatedValue, readOnly,  
    componentClass='input', value='', showTextLengthFeedback = false, labelCols = 4, ...otherProps }) => {
  const { errorMessage, style, warningMessage } = getMessageAndStyle(meta);
  const { labelClassName, wrapperClassName } = getClassNames(labelCols);
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
        <InputLabel error={errorMessage} title={label} className={labelClassName} warning={warningMessage} />
        <div className={wrapperClassName}>
          <FormControl {...otherProps}
            id={id}
            maxLength={maxLength}
            title={label}
            placeholder={label}
            bsStyle={style}
            componentClass={componentClass}
            {...input} 
            {...otherProps}
          >
              { children }
          </FormControl>
          { help && <HelpBlock>{help}</HelpBlock> }
          <ErrorMessage meta={meta} />
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
