/**
 * DocumentsList
 */

import React from 'react';
import {Card, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import Gravatar from 'react-gravatar';
import FlatButton from 'material-ui/FlatButton';

import _mapValues from 'lodash/mapValues';
import _values from 'lodash/values';
import _find from 'lodash/find';
import _indexOf from 'lodash/indexOf';
import _sortBy from 'lodash/sortBy';

/* component styles */
import {styles, ethAddressListItemStyle} from './styles.scss';

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default function DocumentsList(props) {

  let sort = (documents) => {
    return _sortBy(documents, (d) => -d.lastUpdatedBlockNumber);
  }

  console.log(props)
  let account = props.provider.account;
  let contractState = props.provider.contractState;
  let documents = contractState.documents;

  console.log(documents)

  let signDocument = (hash) => {
    let msdsInstance = props.msdsInstance;
    msdsInstance
      .sign(hash, {from: account})
      .then((res) => {
        console.log('transaction success', res);
        // actions.ui.snackbar('Transaction processed: ' + res.receipt.transactionHash);
      })
      .catch((err) => {
        console.error(err);
        // actions.ui.snackbar(err.toString());
      });
  };

  let documentItem = (document) => {
    console.log(document)
    return (
      <div key={document.document} style={{
        paddingBottom: 10
      }}>
        <Card zDepth={2}>
          <CardHeader
            title={document.document}
            subtitle={document.notarized
            ? 'Verified Document in block ' + document.notarizedBlockNumber
            : 'Document'}
            avatar={< Gravatar email = {
            document.document
          } />}
            actAsExpander={true}
            showExpandableButton={true}/>
          <CardText expandable={true}>
            <CardActions>
              {props.isAuthority()
                ? (_indexOf(_values(document.signers), account) > -1
                  ? <FlatButton label="Signed" disabled/>
                  : <FlatButton label="Sign" onClick={() => signDocument(document.document)}/>)
                : null}
              <FlatButton label="Details"/>
            </CardActions>
          </CardText>
        </Card>
      </div>
    )
  }
  return (
    <div className={styles}>
      <Card zDepth={2}>
        <CardTitle title="Documents"/>
        <CardText>
          {Object
            .keys(documents)
            .length === 0
            ? 'No Signed Documents'
            : <List>
              {sort(_values(_mapValues(documents, documentItem)))
}
            </List>
}
        </CardText>
      </Card>
    </div>
  );

}
