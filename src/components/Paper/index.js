/**
 * Paper
 */

import React                    from 'react';
import Paper                    from 'material-ui/Paper';

/* component styles */
import { styles, paperstyle } from './styles.scss';

export default function Button(props) {
  return (
    <div className={styles}>
      <Paper {...props} className={paperstyle} />
    </div>
  );
}
