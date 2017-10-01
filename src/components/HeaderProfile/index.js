/**
 * HeaderPofile
 */

import React                   from 'react';
import Button                  from 'components/Button';
import ActionVerifiedUser      from 'material-ui/svg-icons/action/verified-user';
import ActionInput             from 'material-ui/svg-icons/action/input';
import {white}                   from 'material-ui/styles/colors'; 

/* component styles */
import { styles } from './styles.scss';

export default function HeaderProfile(props) {
  let {
    connected
  } = props;

  return (
    <div>
        <Button
        className={styles}
        primary={true}
        label={connected? 'connected' : 'connect'}
        labelPosition="before"
        icon={connected? <ActionVerifiedUser color={white} /> : <ActionInput color={white} /> }
        />
    </div>
  );
}