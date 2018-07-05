import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateInput = (
  {input, width, placeholder, meta: {touched, error}}
) => {
    return (
      <Form.Field error={touched && !!error} width={width}>
        
      </Form.Field>
    );
}

export default DateInput;