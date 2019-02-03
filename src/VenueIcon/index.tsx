import React from 'react';

type Icon = {
  prefix: string,
  suffix: string
}
const VenueIcons = ({name, icon} : {
  name: string,
  icon: Icon
}) => (<img
  key={`${name}-${icon}`}
  className="icon"
  src={`${icon.prefix}32${icon.suffix}`}
  alt={name}
  title={name}/>);

export default VenueIcons;