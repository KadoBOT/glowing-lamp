import React from 'react';

const Title = ({text} : {
  text: string
}) : JSX.Element => (
  <h1 className="suggested">
    <p>{text}</p>
  </h1>
);

export default Title;