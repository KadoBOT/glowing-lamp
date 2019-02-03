import React from 'react';
import {Col, Card} from 'antd';
import GoogleLink from '../GoogleLink/index';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import VenueIcons from '../VenueIcon/index';

type Args = {
  handleCheckTag: HandleCheckTag,
  isChecked: IsChecked,
  venue: Venue
}
const VenueItem = ({venue, handleCheckTag, isChecked} : Args) => {
  const getVenueIcons = () => venue
    .categories
    .map(({name, icon}) => <VenueIcons name={name} icon={icon}/>);

  const getVenueInfo = () => venue
    .categories
    .map(({id, name}) => (
      <CheckableTag
        key={id}
        onChange={handleCheckTag(name)}
        checked={isChecked(name)}>
        {name}
      </CheckableTag>
    ))

  return (
    <Col xs={24} sm={12} xl={8}>
      <Card
        key={venue.id}
        title={venue.name}
        style={{
        height: '100%'
      }}
        extra={getVenueIcons()}>
        <GoogleLink venue={venue}/> {getVenueInfo()}
      </Card>
    </Col>
  )
}

export default VenueItem;