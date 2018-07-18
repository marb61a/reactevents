import {toastr} from 'react-redux-toastr';
import moment from 'moment';

import { DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
import { 
  asyncActionStart, asyncActionFinish, asyncActionError 
} from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockAPI';
import { createNewEvent } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase.js';

export const createEvent = (event) => {
  return async ( dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);

    try {
      let createdEvent = await firestore.add('events', newEvent);
      await firestore.set(
        `event_attendee/${createdEvent.id}_${user.uid}`, {
          eventId: createEvent.id,
          userId: user.uid,
          eventDate: event.date,
          host: true
        }
      );
      toastr.success('Success', 'An event has been created');
    } catch(err){
      toastr.error('Oops', 'Something went wrong');
    }
  }
};

export const updateEvent = (event) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    if(event.date !== getState().firestore.ordered.events[0].date){
      event.date = moment(event.date).toDate();
    };

    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success', 'Event has been updated');
    } catch(err){
      toastr.error('Oops', 'Something went wrong');
    }
  }
};

export const cancelToggle = (cancelled, eventId) => {
  return async(dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const message = cancelled
    ? 'Are you sure you want to cancel the event?'
    : 'This reactivate the event - are you sure?';

    try {
      toastr.confirm(message, {
        onOk: () => 
          firestore.update(`events/${eventId}`, {
            cancelled: cancelled
          })
      });
    } catch(error){
      console.log(error);
    }
  }
}

export const getEventsFromDashboard = lastEvent => {
  return async(dispatch, getState) => {
    let today = new Date(Date.now());
    const firestore = firebase.firestore();
    const eventsRef = firestore.collection('events');

    try{
      dispatch(asyncActionStart());

      let querySnap = await query.get();
      if (querySnap.docs.length === 0) {
        dispatch(asyncActionFinish());
        return querySnap;
      };

      let events = [];
      for (let i = 0; i < querySnap.docs.length; i++) {
        let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
        events.push(evt);
      };

      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinish());
      return querySnap;
    } catch(error){
      console.log(error);
      dispatch(asyncActionError());
    }
  }
};