import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';

import { 
  asyncActionStart, asyncActionFinish, asyncActionError
} from '../async/asyncActions';
import firebase from '../../app/config/firebase';
import { FETCH_EVENTS } from '../event/eventConstants'

export const updateProfile = (user) => {
  return async(dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    // Stops the isLoaded and isEmpty fields being added automatically 
    // to Firebase when updating user profile
    const { isLoaded, isEmpty, ...updatedUser } = user;

    // Only to be called if updated date of birth differs from already
    // stored user date of birth
    if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth){
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
    }

    try{
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Profile Updated');
    } catch(error){
      console.log(error);
    }
  }
};

// Uploading images
export const uploadProfileImage = (file, fileName) => {
  return async(dispatch, getState, { getFirebase, getFirestore }) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    // This is a synchronous method so no need to await
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: imageName
    };

    try{
      dispatch(asyncActionStart());

      // Upload the image to firebase
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      
      // Get image url
      let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;

      // Get userdoc
      let userDoc = await firestore.get(`users/${user.uid}`);

      // Check if there is an image url
      if(!userDoc.data().photoURL){
        await firebase.updateProfile({
          photoURL: downloadURL
        });

        await user.updateProfile({
          photoURL: downloadURL
        });
      }
      
      // Add the new image to images collection
      await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos'}]
      }, {
        name: imageName,
        url: downloadURL
      });
      dispatch(asyncActionFinish());
    } catch(error){
      console.log(error);
      dispatch(asyncActionError());
      throw new Error('There is a problem uploading the image');
    }
  }
};

// Deleting uploaded image
export const deletePhoto = (photo) => {
  return async(dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);

      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{
          collection: 'photos',
          doc: photo.id
        }]
      });
    } catch(error){
      console.log(error);

      throw new Error('There was a problem deleting the image');
    }
  }
};

// Allow users to set main image
export const setMainPhoto = photo => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    try {
      return await firebase.updateProfile({
        photoURL: photo.url
      });
    } catch(error){
      console.log(error);

      throw new Error('There was a problem setting main image');
    }
  };
};

export const goingToEvent = (event) => {
  return async(dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const attendee = {
      going: true,
      joinDate: Date.now(),
      photoURL: photoURL || '/assets/user.png',
      displayName: user.displayName,
      host: false
    };

    try{
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: attendee
      });

      await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        host: false
      });

      toastr.success('Congratulations', 'You have signed up to the event');
    } catch(error){
      console.log(error);
      toastr.error('Oops', 'There was a problem signing up to the event');
    }
  }
};

export const cancelGoingToEvent = (event) => {
  return async(dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;

    try{
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete()
      });
      await firestore.delete(`event_attendee/${event.id}_${user.uid}`);

      toastr.success('Congratulations', 'You have unsigned from the event');
    } catch(error){
      console.log(error);
      toastr.error('Oops', 'There was a problem');
    }
  }
}

export const getUserEvents = () => {
  return async(dispatch, getState, { getFirestore }) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const today = new Date(Date.now());
    let eventsRef = firestore.collection('event_attendee');
    let query;

    switch(activeTab){
      case 1: // past events
        break;
      case 2: // future events
        break;
      case 3: // hosted events
        break;
      default:
    }
    
    try{
      let querySnap = await query.get();
      let events = [];

      for(let i = 0; i < querySnap.docs.length; i++){
        let evt = await firestore.collection('events').doc(
          querySnap.docs[i].data().eventId
        ).get();

        events.push({...evt.data(), id: evt.id});
      }

      dispatch({type: FETCH_EVENTS, payload: {events}})
      dispatch(asyncActionFinish());
    } catch(error){
      console.log(error);
      dispatch(asyncActionError());
    }
  }
}