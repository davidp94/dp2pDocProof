import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar                 from 'components/AppBar';
import HeaderProfile          from 'components/HeaderProfile';
/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

/* component styles */
import { styles } from './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleToggle=() => {
    this.props.actions.ui.openNav();
  }

  render() {
    return (
      <div className={styles}>
        <header>
          <AppBar
          onLeftIconButtonTouchTap= {this.handleToggle}
          title="dp2p - Document Signer"
          iconElementRight={
            <HeaderProfile className={styles.rightElementClass} account={this.props.provider.account} connected={this.props.provider.account}/>
          }
           />
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    provider: state.provider
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);