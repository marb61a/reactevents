import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';

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
      return await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos'}]
      }, {
        name: imageName,
        url: downloadURL
      });

    } catch(error){
      console.log(error);

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
      await firebase.delete(`${user.uid}/user_images/${photo.name}`);

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