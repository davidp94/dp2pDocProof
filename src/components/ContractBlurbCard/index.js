/**
 * ContractBlurbCard
 */

import React                    from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Gravatar             from 'react-gravatar';


/* component styles */
import { styles } from './styles.scss';

export default function ContractBlurbCard(props) {
  let {
      contractAddress,
      authorities,
      minSignature
  } = props.contractInitInfo;


  let ContractAddress = () => {
    return (
      <span>
        {contractAddress}
      </span>
    )
  }

  let AuthoritiesCount = () => {
    return (
      <span>
        {authorities.length} authorities
      </span>
    );
  };

  let MinRequiredSignature = () => {
    return (
      <span>
        {minSignature.length} required signature{minSignature.length>1? 's': null} per document
      </span>
    );
  };

  let ethAddressListItem = (ethAddress) => {
    return (
      <ListItem
        primaryText={ethAddress}
        leftAvatar={<Gravatar email={ethAddress} />}
        rightIcon={<ActionInfo />}
      />
    )
  };



  return (
      <div className={styles}>
        <Card className={styles}>
          <CardHeader
            title={<div>Contract <ContractAddress /> </div>}
            subtitle={
              <div>
              
              <AuthoritiesCount />
              - <MinRequiredSignature />
              </div>
              }
            avatar={
              <Gravatar email={contractAddress} />
            }
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <List>
              <Subheader>Authorities</Subheader>
              {authorities.map(ethAddressListItem)}
            </List>
          </CardText>
        </Card>
      </div>
  );
}
