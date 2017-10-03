import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Drawer,
//          AppBar,
//          Divider }            from 'material-ui';

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
        Sign document Form
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