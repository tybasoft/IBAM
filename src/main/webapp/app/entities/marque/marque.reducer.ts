import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMarque, defaultValue } from 'app/shared/model/marque.model';

export const ACTION_TYPES = {
  FETCH_MARQUE_LIST: 'marque/FETCH_MARQUE_LIST',
  FETCH_MARQUE: 'marque/FETCH_MARQUE',
  CREATE_MARQUE: 'marque/CREATE_MARQUE',
  UPDATE_MARQUE: 'marque/UPDATE_MARQUE',
  DELETE_MARQUE: 'marque/DELETE_MARQUE',
  RESET: 'marque/RESET',
  REPPORT: 'marque/REPPORT',
  FILTER_MARQUE_LIST: 'marque/FILTER'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMarque>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MarqueState = Readonly<typeof initialState>;

// Reducer

export default (state: MarqueState = initialState, action): MarqueState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MARQUE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MARQUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MARQUE):
    case REQUEST(ACTION_TYPES.UPDATE_MARQUE):
    case REQUEST(ACTION_TYPES.DELETE_MARQUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case REQUEST(ACTION_TYPES.REPPORT):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MARQUE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MARQUE):
    case FAILURE(ACTION_TYPES.CREATE_MARQUE):
    case FAILURE(ACTION_TYPES.UPDATE_MARQUE):
    case FAILURE(ACTION_TYPES.DELETE_MARQUE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MARQUE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MARQUE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MARQUE):
    case SUCCESS(ACTION_TYPES.UPDATE_MARQUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MARQUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case SUCCESS(ACTION_TYPES.FILTER_MARQUE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    default:
      return state;
  }
};

export const apiUrl = 'api/marques';

// Actions

export const getEntities: ICrudGetAllAction<IMarque> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MARQUE_LIST,
    payload: axios.get<IMarque>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const filterEntities: ICrudGetAllAction<IMarque> = filter => ({
  type: ACTION_TYPES.FILTER_MARQUE_LIST,
  payload: axios.get<IMarque>(`${apiUrl}/search-entities/${filter}`)
});

export const getEntity: ICrudGetAction<IMarque> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MARQUE,
    payload: axios.get<IMarque>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMarque> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MARQUE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMarque> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MARQUE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());

  return result;
};

export const deleteEntity: ICrudDeleteAction<IMarque> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MARQUE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());

  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
