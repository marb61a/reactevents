import { MODAL_OPEN, MODAL_CLOSE } from './modalConstants';
import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = null;

export const openModal = (state, payload) => {
  const { modalTypes, modalProps } = payload;
  return { 
    modalTypes, modalProps
  };
}

export const closeModal = (state, payload) => {
  return null;
}

export default createReducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal
});
