import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';

export const login = (creds) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {

    } catch(error){
      console.log(error);
    }

    dispatch(closeModal())
  };
};

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  };
};