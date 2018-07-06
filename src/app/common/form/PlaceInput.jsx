import React, { Component } from 'react';
import { Form, Label} from'semantic-ui-react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { defaultFormat } from 'moment';

class PlaceInput extends Component {
  state = {
    scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({
    scriptLoaded: true
  });

  render() {
    const {input, width, onSelect, placeholder, options, meta: {touched, error}}

    return (
      <Form.Field error={touched && !error} width={width}>
        <input {...input} placeholder={placeholder} type={type} /> 
        <Script 
          url='https://maps.googleapis.com/maps/api/js?key=API&libraries=places'
          onLoad={this.handleScriptLoad}
        />
      </Form.Field>
    );
  }
}

export default PlaceInput;