import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaie, defaultValue } from 'app/shared/model/paie.model';

export const ACTION_TYPES = {
  FETCH_PAIE_LIST: 'paie/FETCH_PAIE_LIST',
  FETCH_PAIE: 'paie/FETCH_PAIE',
  CREATE_PAIE: 'paie/CREATE_PAIE',
  UPDATE_PAIE: 'paie/UPDATE_PAIE',
  DELETE_PAIE: 'paie/DELETE_PAIE',
  RESET: 'paie/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaie>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PaieState = Readonly<typeof initialState>;

// Reducer

export default (state: PaieState = initialState, action): PaieState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAIE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAIE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PAIE):
    case REQUEST(ACTION_TYPES.UPDATE_PAIE):
    case REQUEST(ACTION_TYPES.DELETE_PAIE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PAIE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAIE):
    case FAILURE(ACTION_TYPES.CREATE_PAIE):
    case FAILURE(ACTION_TYPES.UPDATE_PAIE):
    case FAILURE(ACTION_TYPES.DELETE_PAIE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAIE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAIE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAIE):
    case SUCCESS(ACTION_TYPES.UPDATE_PAIE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAIE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/paies';

// Actions

export const getEntities: ICrudGetAllAction<IPaie> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PAIE_LIST,
    payload: axios.get<IPaie>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPaie> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAIE,
    payload: axios.get<IPaie>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPaie> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAIE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaie> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAIE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaie> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAIE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
