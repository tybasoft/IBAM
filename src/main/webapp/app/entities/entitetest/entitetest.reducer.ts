import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEntitetest, defaultValue } from 'app/shared/model/entitetest.model';

export const ACTION_TYPES = {
  FETCH_ENTITETEST_LIST: 'entitetest/FETCH_ENTITETEST_LIST',
  FETCH_ENTITETEST: 'entitetest/FETCH_ENTITETEST',
  RESET: 'entitetest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEntitetest>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type EntitetestState = Readonly<typeof initialState>;

// Reducer

export default (state: EntitetestState = initialState, action): EntitetestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ENTITETEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENTITETEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ENTITETEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENTITETEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENTITETEST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENTITETEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/entitetests';

// Actions

export const getEntities: ICrudGetAllAction<IEntitetest> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ENTITETEST_LIST,
    payload: axios.get<IEntitetest>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IEntitetest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENTITETEST,
    payload: axios.get<IEntitetest>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
