import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

/* component styles */
import { styles } from './styles.scss';

import Swarm                  from 'swarm-js';

/* actions */
import * as uiActionCreators   from 'core/actions/actions-ui';

class SignNewDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swarmInstance: null
    };

    this.handleUploadAndSign = this.handleUploadAndSign.bind(this);
    this.handleSignOnly = this.handleSignOnly.bind(this);
  }

  componentDidMount() {
    let _swarmInstance = Swarm.at('http://swarm-gateways.net');    
    this.setState({
      swarmInstance: _swarmInstance
    })
  }

  uploadSwarm = (callback) => {
    let {
      swarmInstance
    } = this.state;
    this.state.swarmInstance.upload({
      pick: 'data'
    })
    .then(callback);
  };

  handleUploadAndSign = () => {
    let {
      msdsInstance,
      actions,
      provider
    } = this.props;
    this.uploadSwarm((swarmInfo) => {
      console.log(swarmInfo);
      console.log(this.props.msdsInstance);
      swarmInfo = '0x' + swarmInfo;
      msdsInstance
        .sign(swarmInfo,
        {
          from: provider.account
        })
        .then((res) => {
          console.log('transaction success', res);
          actions.ui.snackbar('Transaction processed: ' + res.receipt.transactionHash);
        })
        .catch((err) => {
          console.error(err);
          actions.ui.snackbar(err.toString());
        });
    });
  }

  handleSignOnly = () => {
    console.log('signOnly')
    let {
      swarmInstance
    } = this.state;
    this.state.swarmInstance.pick.data()
    .then((data) => {
      let hash = this.state.swarmInstance.hash(data);
      console.log(hash);
    })
  }

  render() {

    return (
      <div className={styles} >
        <Card zDepth={2}>
          <CardTitle title="Sign a new document" />
          <CardText>
            <div>
            In order to sign a new document, please pick one option: <br/>
            - Upload and Sign
            <br />
            - Sign Only
            </div>
          </CardText>
          <CardActions>
            <FlatButton primary={true} label="Upload and sign" onClick={this.handleUploadAndSign} />
            <FlatButton secondary={true} label="Sign Only" onClick={this.handleSignOnly} />
          </CardActions>
        </Card>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    ui: state.ui,
    provider: state.provider
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui   : bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignNewDocumentForm);