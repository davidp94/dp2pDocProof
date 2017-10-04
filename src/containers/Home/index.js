import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'components/Paper';

import ContractBlurbCard from 'components/ContractBlurbCard';
import SignNewDocumentForm from 'containers/SignNewDocumentForm';

import _find from 'lodash/find';

/* component styles */
import { styles } from './styles.scss';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    let {
      contractInitInfo,
      account
    } = this.props.provider;

    let {
      authorities
    } = contractInitInfo;

    let isAuthority = () => {
      return account && _find(authorities, account.address);
    };

    console.log(contractInitInfo)
    return (
      <div className={styles}>
        { contractInitInfo ? 
        <ContractBlurbCard contractInitInfo={contractInitInfo} />
        :
        null
        }
        <br />
        { isAuthority() ?
          <SignNewDocumentForm msdsInstance={this.props.msdsInstance} />
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