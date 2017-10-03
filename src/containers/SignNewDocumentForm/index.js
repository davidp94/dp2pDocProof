import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

/* component styles */
import { styles } from './styles.scss';

/* actions */
// import * as uiActionCreators   from 'core/actions/actions-ui';

class SignNewDocumentForm extends Component {
  constructor(props) {
    super(props);
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
            <FlatButton primary={true} label="Upload and sign" />
            <FlatButton secondary={true} label="Sign Only" />
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
    //   ui   : bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignNewDocumentForm);