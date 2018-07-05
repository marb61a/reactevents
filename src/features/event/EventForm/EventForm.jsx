import React, { Component } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import cuid from 'cuid';
 
import { createEvent, updateEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {}

  if(eventId && state.events.length > 0){
    event = state.events.filter(event => eventId === event.id)[0];
  }

  return {
    initialValues: event
  }
};

const actions = {
  createEvent,
  updateEvent
};

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: "The Event Title Is Required"}),
  category: isRequired({message: "Please Select A Category"}),
  description: composeValidators(
    isRequired({message: "Please Enter A Description"}),
    hasLengthGreaterThan(4)({message: "Description should be longer than 4 characters"})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue')
})

class EventForm extends Component {
  onFormSubmit = values => {
    if(this.props.initialValues.id){
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob'
      }

      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field 
                name='title'
                type='text'
                component={TextInput}
                placeholder='Give Your Event A Name'
              />
              <Field 
                name='category'
                type='text'
                component={SelectInput}
                options={category}
                placeholder='What Is Your Event About'
              />
              <Field 
                name='description'
                type='text'
                rows={3}
                component={TextArea}
                placeholder='Tell Us About Your Event'
              />
              <Field 
                name='city'
                type='text'
                component={TextInput}
                placeholder='Event City'
              />
              <Field 
                name='venue'
                type='text'
                component={TextInput}
                placeholder='Event Venue'
              />
              <Field 
                name='date'
                type='text'
                component={TextInput}
                placeholder='Event Date'
              />
              <Button positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true})(EventForm));