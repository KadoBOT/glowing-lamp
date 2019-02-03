import React from 'react';

const GoogleLink = ({venue} : {
  venue: Venue
}) => (
  <a
    href={`https://maps.google.com/?ll=${venue.location.lat},${venue.location.lng}&q=${venue.name}, ${venue.location.address}`}
    target="_blank"
    rel="noopener no referrer">
    <p>{venue
        .location
        .formattedAddress
        .join(', ')}
    </p>
  </a>
);

export default GoogleLink;