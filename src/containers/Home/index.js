import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'components/Paper';

/* component styles */
import { styles } from './styles.scss';

class Home extends Component {
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

function mapStateToProps(state) {
  return {
    provider: state.provider
  };
}

export default connect(mapStateToProps)(Home);