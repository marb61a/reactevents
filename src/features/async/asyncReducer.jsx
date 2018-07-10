import { createReducer} from '../../app/common/util/reducerUtil';
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from './asyncConstants';

const initialState = {
  loading: false
};
