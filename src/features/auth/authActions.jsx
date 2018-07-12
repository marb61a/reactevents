import { SubmissionError } from 'redux-form';
import { SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';
import { getFirestore } from 'redux-firestore';

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().signInWithEmailAndPassword(
        creds.email, creds.password
      );
      dispatch(closeModal());
    } catch(error){
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const registerUser = (user) => {
  return async(dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

    } catch(error) {
      console.log(error);
    }
  }
};