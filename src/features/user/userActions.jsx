import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) => {
  return async(dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    // Stops the isLoaded and isEmpty fields being added automatically 
    // to Firebase when updating user profile
    const { isLoaded, isEmpty, ...updatedUser } = user;

    if(updatedUser.dateOfBirth){
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