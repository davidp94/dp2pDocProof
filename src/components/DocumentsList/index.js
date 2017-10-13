/**
 * DocumentsList
 */

import React                    from 'react';
import {Card, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import Gravatar             from 'react-gravatar';
import FlatButton from 'material-ui/FlatButton';

import _mapValues from 'lodash/mapValues';
import _values from 'lodash/values';
import _find from 'lodash/find';
import _indexOf from 'lodash/indexOf';

/* component styles */
import { styles, ethAddressListItemStyle } from './styles.scss';

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default function DocumentsList(props) {


  console.log(props)
  let account = props.provider.account;
  let contractState = props.provider.contractState;
  let documents = contractState.documents;

  console.log(documents)

  let documentItem = (document) => {
    console.log(document)
    return (
      <ListItem
      key={document.document}>
        <Card zDepth={2}>
          <CardHeader
            title={document.document}
            subtitle={document.notarized ? 'Verified Document' : 'Document'}
            avatar={<Gravatar email={document.document} />}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <CardActions>
              {_indexOf(_values(document.signers), account) > -1 ? <FlatButton label="Signed" disabled />: <FlatButton label="Sign" />}
              <FlatButton label="Details" />
            </CardActions>
          </CardText>
        </Card>
      </ListItem>
    )
  }
  return (
      <div className={styles}>
         <Card zDepth={2}>
          <CardTitle title="Documents" />
          <CardText>
            {
              Object.keys(documents).length === 0 ?
              'No Signed Documents'
              :
              <List>
                {
                  _values(_mapValues(documents, documentItem))
                }
              </List>
            }
          </CardText>
        </Card>
      </div>
);
    
  
}
