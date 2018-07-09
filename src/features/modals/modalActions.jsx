import { MODAL_OPEN, MODAL_CLOSE } from './modalConstants';

export const openModal = (modalType, modalProps) => {
  return {
    type: MODAL_OPEN
  }
}

export const closeModal = (modalType, modalProps) => {
  return {
    type: MODAL_CLOSE
  }
}