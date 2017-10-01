/**
 * Button - A common button
 */

import React                    from 'react';
import { FlatButton,
         RaisedButton,
         FloatingActionButton,
         IconButton }           from 'material-ui';
import PropTypes                from 'prop-types';

/* component styles */
import { styles } from './styles.scss';

export default function Button(props) {
  const buttonElem = createButton(props);
  return (
    <div className={styles}>
      {buttonElem}
    </div>
  );
}

function createButton(props) {
  const {
    label,
    className,
    onTouchTap,
    icon,
    disabled,
    primary,
    labelPosition,
    secondary } = props;

  let buttonElem;

  if(props.floating) {
    buttonElem = <FloatingActionButton
                  label={label}
                  onTouchTap={onTouchTap}
                  className={className}
                  icon={icon}
                  disabled={disabled}
                  labelPosition={labelPosition}
                  secondary={true}>
                  {props.icon}
                 </FloatingActionButton>

  } else if(props.floating && props.secondary) {
    buttonElem = <FloatingActionButton
                  label={label}
                  onTouchTap={onTouchTap}
                  className={className}
                  icon={icon}
                  labelPosition={labelPosition}
                  disabled={disabled}
                  secondary={true} />

  } else if(props.iconOnly){
    buttonElem= <IconButton
                  label={label}
                  onTouchTap={onTouchTap}
                  labelPosition={labelPosition}
                  className={className}
                  disabled={disabled}
                  icon={icon}>{props.icon}</IconButton>;

  } else if(props.raised && props.secondary) {
    buttonElem = <RaisedButton
                  label={label}
                  onTouchTap={onTouchTap}
                  className={className}
                  labelPosition={labelPosition}
                  icon={icon}
                  disabled={disabled}
                  secondary={true} />

  } else if(props.raised) {
    buttonElem = <RaisedButton
                  label={label}
                  className={className}
                  onTouchTap={onTouchTap}
                  labelPosition={labelPosition}
                  primary={primary}
                  secondary={secondary}
                  disabled={disabled} />
  } else if(props.flat) {
    buttonElem = <FlatButton
                  onTouchTap={onTouchTap}
                  className={className}
                  labelPosition={labelPosition}
                  icon={icon}
                  disabled={disabled} />
  } else {
    buttonElem = <FlatButton
                  onTouchTap={onTouchTap}
                  className={className}
                  icon={icon}
                  labelPosition={labelPosition}
                  label={label}
                  disabled={disabled} />
  }

  return buttonElem;
}

Button.propTypes = {
  raised   : PropTypes.bool,
  floating : PropTypes.bool,
  disabled : PropTypes.bool
};

Button.defaultProps = {
  type      : 'button',
  raised    : false,
  label     : '',
  className : 'btn',
  disabled : false,
  primary : true,
  secondary: false
}