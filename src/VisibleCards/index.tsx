import React from 'react';
import VenueItem from '../VenueItem/index';

type Args = {
  items: Items,
  handleCheckTag: HandleCheckTag,
  isChecked(name : string): boolean
};

const VisibleCards = ({items, handleCheckTag, isChecked} : Args) => (
  <React.Fragment>
    {items.map(({venue}) => (<VenueItem venue={venue} handleCheckTag={handleCheckTag} isChecked={isChecked}/>))}
  </React.Fragment>
)

export default VisibleCards;