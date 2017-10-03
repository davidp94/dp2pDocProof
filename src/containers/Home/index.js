import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'components/Paper';

import ContractBlurbCard from 'components/ContractBlurbCard';

/* component styles */
import { styles } from './styles.scss';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      contractInitInfo
    } = this.props.provider;
    console.log(contractInitInfo)
    return (
      <div className={styles}>
        <Paper zDepth={2}>
          Welcome to Document Signer.
        </Paper>
        { contractInitInfo ? 
        <ContractBlurbCard contractInitInfo={contractInitInfo} />
        :
        null
        }
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