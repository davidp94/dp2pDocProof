/**
 * HeaderPofile
 */

import React                   from 'react';
import FlatButton                  from 'material-ui/FlatButton';
import ActionInput             from 'material-ui/svg-icons/action/input';
import {white}                   from 'material-ui/styles/colors'; 
import Gravatar             from 'react-gravatar';

/* component styles */
import { styles } from './styles.scss';

export default function HeaderProfile(props) {
  let {
    connected,
    account
  } = props;

  return (
    <div>
        <FlatButton
        className={styles}
        primary={true}
        label={connected? account.substring(0, 8) : 'Install web3'}
        labelPosition="before"
        icon={connected? <Gravatar email={account} />: <ActionInput color={white} /> }
        />
    </div>
  );
}