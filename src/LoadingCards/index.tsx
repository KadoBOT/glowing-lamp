import React from 'react';
import {Col, Card} from 'antd';
import {Meta} from 'antd/lib/list/Item';

const LoadingCards = ({index} : {
  index: number
}) => (
  <Col xs={24} sm={12} xl={8}>
    <Card
      id={`card-loading-${index}`}
      style={{
      marginRight: 5,
      height: '100%'
    }}
      loading>
      <Meta title="Card Title" description="Card description"/>
    </Card>
  </Col>
)

export default LoadingCards;