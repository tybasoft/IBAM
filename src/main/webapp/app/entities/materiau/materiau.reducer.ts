import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMateriau, defaultValue } from 'app/shared/model/materiau.model';

export const ACTION_TYPES = {
  FETCH_MATERIAU_LIST: 'materiau/FETCH_MATERIAU_LIST',
  FETCH_MATERIAU: 'materiau/FETCH_MATERIAU',
  CREATE_MATERIAU: 'materiau/CREATE_MATERIAU',
  UPDATE_MATERIAU: 'materiau/UPDATE_MATERIAU',
  DELETE_MATERIAU: 'materiau/DELETE_MATERIAU',
  RESET: 'materiau/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMateriau>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MateriauState = Readonly<typeof initialState>;

// Reducer

export default (state: MateriauState = initialState, action): MateriauState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MATERIAU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MATERIAU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MATERIAU):
    case REQUEST(ACTION_TYPES.UPDATE_MATERIAU):
    case REQUEST(ACTION_TYPES.DELETE_MATERIAU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MATERIAU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MATERIAU):
    case FAILURE(ACTION_TYPES.CREATE_MATERIAU):
    case FAILURE(ACTION_TYPES.UPDATE_MATERIAU):
    case FAILURE(ACTION_TYPES.DELETE_MATERIAU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATERIAU_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATERIAU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MATERIAU):
    case SUCCESS(ACTION_TYPES.UPDATE_MATERIAU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MATERIAU):
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

const apiUrl = 'api/materiaus';

// Actions

export const getEntities: ICrudGetAllAction<IMateriau> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MATERIAU_LIST,
    payload: axios.get<IMateriau>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMateriau> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MATERIAU,
    payload: axios.get<IMateriau>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMateriau> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MATERIAU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMateriau> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MATERIAU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMateriau> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MATERIAU,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
