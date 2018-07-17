import {toastr} from 'react-redux-toastr';

import { 
  CREATE_EVENT, 
  UPDATE_EVENT, 
  DELETE_EVENT, 
  FETCH_EVENTS 
} from './eventConstants';
import { 
  asyncActionStart, 
  asyncActionFinish, 
  asyncActionError 
} from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockAPI';

export const fetchEvents = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events
  }
};

export const createEvent = (event) => {
  return async ( dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);

    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success('Success', 'An event has been created');
    } catch(err){
      toastr.error('Oops', 'Something went wrong');
    }
  }
};

export const updateEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });

      toastr.success('Success', 'Event has been updated');
    } catch(err){
      toastr.error('Oops', 'Something went wrong');
    }
  }
};

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch(error){
      console.log(error);
      dispatch(asyncActionError());
    }
  }
};