import React, { Component } from 'react';

import Paper from 'components/Paper';

/* component styles */
import { styles } from './styles.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
        <Paper zDepth={2}>
          Welcome to Document Signer.
        </Paper>
      </div>
    );
  }
}
