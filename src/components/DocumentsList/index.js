/**
 * DocumentsList
 */

import React                    from 'react';
import {Card, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Gravatar             from 'react-gravatar';

import _mapValues from 'lodash/mapValues';

/* component styles */
import { styles, ethAddressListItemStyle } from './styles.scss';

export default function DocumentsList(props) {
    //   let {
//       contractAddress,
//       authorities,
//       minSignature,
//       deployedBlockNumber
//   } = props.contractInitInfo;


//   let ContractAddress = () => {
//     return (
//       <span>
//         {contractAddress}
//       </span>
//     )
//   }

//   let AuthoritiesCount = () => {
//     return (
//       <span>
//         {authorities.length} authorities
//       </span>
//     );
//   };

//   let MinRequiredSignature = () => {
//     return (
//       <span>
//         {minSignature.length} required signature{minSignature.length>1? 's': null} per document
//       </span>
//     );
//   };

//   let ethAddressListItem = (ethAddress) => {
//     return (
//       <ListItem
//         key={ethAddress}
//         primaryText={
//           <div 
//           className={ethAddressListItemStyle}>
//             {ethAddress}
//           </div>
//         }
//         leftAvatar={<Gravatar email={ethAddress} />}
//         rightIcon={<ActionInfo />}
//       />
//     )
//   };
  let contractState = props.provider.contractState;
  let documents = contractState.documents;

  console.log(documents)

  let documentItem = (document) => {
    console.log(document)
    return (
      <ListItem>
        {document}
        {/* {document.signers.length} signers */}
        {document.signersCount}
        Document: {document.document}
        
      </ListItem>
    )
  }
  return (
      <div className={styles}>
         <Card zDepth={2}>
          <CardTitle title="Documents" />
          <CardText>
            <h3>
              {
                documents.length === 0 ?
                'No Signed Documents'
                :
                <List>
                  {
                    _mapValues(documents, documentItem)
                  }
                </List>
              }
            </h3>
          </CardText>
          {/* <CardActions>
            <FlatButton primary={true} label="Upload and sign" onClick={this.handleUploadAndSign} />
            <FlatButton secondary={true} label="Sign Only" onClick={this.handleSignOnly} />
          </CardActions> */}
        </Card>
      </div>
);
    
  
}
