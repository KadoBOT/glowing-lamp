import React from 'react';
import {Row, Form, InputNumber, Checkbox} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type Args = {
  handleRadiusBlur: PromiseVoidFn,
  handleRadius: HandleRadius,
  handleCheckbox: HandleCheckBox,
  radiusValue: number 
}

const Filters = ({handleRadiusBlur, handleRadius, handleCheckbox, radiusValue}: Args) => {
  const formatter = (value : string | number | undefined) : string => {
    if (value) 
      return `${Number(value)}m`;
    return String(radiusValue)
  };
  
  const parser = (value : string | undefined) : number => {
    if (value) {
      return Number(value.replace('m', ''))
    }
    return radiusValue
  };

  return (
    <Row>
      <Form layout="inline">
        <Form.Item label="Radius">
          <InputNumber
            onBlur={handleRadiusBlur}
            parser={parser}
            formatter={formatter}
            decimalSeparator="."
            min={1}
            size="large"
            step={50}
            max={100000}
            defaultValue={radiusValue}
            onChange={handleRadius}/>
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={handleCheckbox}>Open now?</Checkbox>
        </Form.Item>
      </Form>
    </Row>
  )
};

export default Filters;