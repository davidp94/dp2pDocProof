import React, { Component }       from 'react';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import injectTapEventPlugin       from 'react-tap-event-plugin';
import getMuiTheme                from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider           from 'material-ui/styles/MuiThemeProvider';
import { HashRouter, Route }      from 'react-router-dom'
import * as OfflinePluginRuntime  from 'offline-plugin/runtime';
import Web3                       from 'web3';


// Contract
import MultiSigDocumentSignerContract from '../../../build/contracts/MultiSigDocumentSigner.json';
const contract = require('truffle-contract')

// global styles for entire app
import './styles/app.scss';

/* application containers */
import Header     from 'containers/Header';
import Snackbar from 'material-ui/Snackbar';
import LeftNavBar from 'containers/LeftNavBar';
import Home       from 'containers/Home';

/* actions */
import * as providerActionCreators from 'core/actions/actions-provider';

injectTapEventPlugin();

OfflinePluginRuntime.install();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msdsInstance: null
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    const currentProvider = window.web3 && window.web3.currentProvider || undefined;
    let web3Provider;

    if (typeof window.web3 !== 'undefined') {
      web3Provider = new Web3(currentProvider);
    } else {
      console.error('web3 not detected, fallback strategy')
      web3Provider = new Web3('http://localhost:8686');
    }

    actions.provider.specifyProvider(web3Provider);

    if(web3Provider) {
      const msds = contract(MultiSigDocumentSignerContract);
      msds.setProvider(web3Provider.currentProvider);

      web3Provider.eth.getCoinbase((err, coinbase) => {
        if(err) console.error(err);
        msds.deployed().then((instance) => {
          this.setState({
            msdsInstance : instance
          });

          console.log(this.state.msdsInstance)

          this.initializeEventsListeners();
        });
      });
    }
  }

  initializeEventsListeners() {
    let msdsInstance = this.state.msdsInstance;
    const { actions } = this.props;
    msdsInstance.contract.ContractInit({}, {
      fromBlock: 0,
      toBlock: 'latest'
    })
    .watch((err, data) => {
      if(err) console.error(err);
      else {
        const args = data.args;
        actions.provider.setContractInitInfo({
          contractAddress: args._contractAddress,
          authorities: args._authorities,
          minSignature: args._minSignature.toString(),
          deployedBlockNumber: data.blockNumber
        });
      }
    });

    msdsInstance.contract.SignedDocument({}, {
      fromBlock: 0,
      toBlock: 'latest'
    })
    .watch((err, data) => {
      if(err) {
        console.error(err);
      }
      else {
        const args = data.args;
        actions.provider.addSignature({
          blockNumber: data.blockNumber,
          //transactionHash ?
          document: args.document,
          signer: args.signer
        });
      }
    });

    msdsInstance.contract.NotarizedDocument({}, {
      fromBlock: 0,
      toBlock: 'latest'
    })
    .watch((err, data) => {
      console.log('notarized document', data);
      if(err) {
        console.error(err);
      }
      else {
        const args = data.args;
        actions.provider.notarizeDocument({
          blockNumber: data.blockNumber,
          //transactionHash ?
          document: args.document
        });
      }
    });

    msdsInstance.contract.UnsignedDocument({}, {
      fromBlock: 0,
      toBlock: 'latest'
    })
    .watch((err, data) => {
      console.log('unsigned document', data);
      if(err) {
        console.error(err);
      }
      else {
        const args = data.args;
        actions.provider.delSignature({
          blockNumber: data.blockNumber,
          //transactionHash ?
          document: args.document,
          signer: args.signer
        });
      }
    });
  }

  render() {

    let HomeWithProps = (props) => {
      return (
        <Home
        msdsInstance={this.state.msdsInstance}
        {...props}
        />
      )
    }
    console.log(this.state);
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <HashRouter>
          <div>
            <Header />
            <div className="container">
              <div>
                <Route exact path="/" component={HomeWithProps} />
              </div>
            </div>
            <LeftNavBar />
            <Snackbar
              open={this.props.ui.snackbarOpen}
              message={
                <div>
                  {this.props.ui.snackbarText}
                </div>
                  }
              autoHideDuration={2500}
            />
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);