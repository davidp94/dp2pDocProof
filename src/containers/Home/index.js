import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'components/Paper';
import LinearProgress from 'material-ui/LinearProgress';

import ContractBlurbCard from 'components/ContractBlurbCard';
import SignNewDocumentForm from 'containers/SignNewDocumentForm';

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

    let isAuthority = () => {
      if(!contractInitInfo || !contractInitInfo.authorities) return false;
      let authorities = contractInitInfo.authorities;
      return account && authorities && authorities.findIndex((v)=>v===account)>-1;
    };

    console.log(contractInitInfo)
    return (
      <div className={styles}>
        { contractInitInfo ? 
        <div>
          <ContractBlurbCard contractInitInfo={contractInitInfo} />
          <br />
          { isAuthority() ?
            <SignNewDocumentForm msdsInstance={this.props.msdsInstance} />
            :
            null
          }
        </div>
        :
        <div>
          <h2>
            Loading Smart Contract...
          </h2>
          <LinearProgress mode="indeterminate" />
        </div>
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