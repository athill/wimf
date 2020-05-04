import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const Icon = ({ icon, size = 'lg', spinning = false, className='', ...otherProps }) => {
	className = classnames(['fa', `fa-${icon}`, {[`fa-${size}`]: size, 'fa-spin': spinning}].concat(className.split(' ')));
	return <i {...otherProps} className={className}></i>
};

const faSizes = PropTypes.oneOf(['', 'sm', 'lg', '2x', '3x', '4x', '5x']);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: faSizes,
  spinning: PropTypes.bool
};
Icon.displayName = 'Icon';

export const Spinner = ({ size = 'lg' }) => <Icon icon="cog" size={size} spinning />;

Spinner.propTypes = {
  size: faSizes
};
Spinner.displayName = 'Spinner';

export const NoOp = () => <noscript />;
NoOp.displayName = 'NoOp';