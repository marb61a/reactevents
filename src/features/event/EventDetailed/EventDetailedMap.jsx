import React  from 'react';
import { Segment } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon 
    name="marker"
    size="big"
    color="red"
  />;

const EventDetailedMap = ({lat, lng}) => {
  const center = [lat, lng];
  const zoom = 14;

  return (
    <Segment attached='bottom'>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    </Segment>
  );
}

export default EventDetailedMap;