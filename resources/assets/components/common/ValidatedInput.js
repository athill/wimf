import React from 'react';
import { Input, FormControls, Glyphicon, Label, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Icon, NoOp } from './common';

const InputLabel = ({ title, error = '', warning = '' }) => {
  const message = error || warning;
  if (message) {
    const icon = error ? 'times-circle' : 'exclamation-triangle';
    const tooltip = (<Tooltip id={`${title}ToolTip`} tabIndex={1000}>{message}</Tooltip>);
    return (
      <span>{title} <OverlayTrigger overlay={tooltip}><Icon icon={icon} size="sm" /></OverlayTrigger></span>
    );
  } else {
    return <span>{title}</span>;
  }
};
InputLabel.propTypes = {
  error: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  warning: React.PropTypes.string
};



const ValidatedInput = ({ error, id, maxLength, mutatedValue, readOnly, touched, warning, 
    label = '', value = '', showTextLengthFeedback = false, valid = true, labelCols = 4, ...otherProps }) => {
  let errorMessage, style, warningMessage;
  if (touched) {
    if (valid) {
      if (warning != undefined) {
        warningMessage = warning;
        style = 'warning';
      }
    } else {
      errorMessage = error;
      style = 'error';
    }
  }
  //const lengthBadge = (<LengthBadge length={value.length} maxLength={maxLength} />);
  const labelComponent = (<InputLabel title={label} warning={warningMessage} error={errorMessage} />);
  const errorComponent = error ? <div className='text-danger'>{error}</div> : <NoOp />;
  //const helpNode = <output id={id + "Output"} className="mutated-input">{mutatedValue}</output>;
  if (readOnly) {
    return (
      <div>
        <input {...otherProps}  type="hidden" />
        <FormControls.Static label={label} value={value} />
      </div>
    );
  } else {
    return (
      <Input {...otherProps}
        id={id}
        maxLength={maxLength}
        label={label}
        help={errorComponent}
        title={label}
        value={value}
        placeholder={label}
        hasFeedback={showTextLengthFeedback}
        bsStyle={style}
        labelClassName={"col-xs-"+labelCols} 
        wrapperClassName={"col-xs-"+(12-labelCols)} />
    );
  }
};

ValidatedInput.propTypes = {
  error: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  showTextLengthFeedback: React.PropTypes.bool,
  label: React.PropTypes.string.isRequired,
  touched: React.PropTypes.bool,
  type: React.PropTypes.string,
  valid: React.PropTypes.bool,
  value: React.PropTypes.string,
  warning: React.PropTypes.string
};

export default ValidatedInput;
