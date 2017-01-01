import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';

export const Icon = ({ icon, size = 'lg', spinning = false, className='', ...otherProps }) => {
	className = classnames(['fa', `fa-${icon}`, {[`fa-${size}`]: size, 'fa-spin': spinning}].concat(className.split(' ')));
	return <i {...otherProps} className={className}></i>
};

const faSizes = React.PropTypes.oneOf(['', 'sm', 'lg', '2x', '3x', '4x', '5x']);

Icon.propTypes = {
  icon: React.PropTypes.string.isRequired,
  size: faSizes,
  spinning: React.PropTypes.bool
};
Icon.displayName = 'Icon';

export const Spinner = ({ size = 'lg' }) => <Icon icon="cog" size={size} spinning />;

Spinner.propTypes = {
  size: faSizes
};

export const NoOp = () => <noscript />;