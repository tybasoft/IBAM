import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUnite, defaultValue } from 'app/shared/model/unite.model';

export const ACTION_TYPES = {
  FETCH_UNITE_LIST: 'unite/FETCH_UNITE_LIST',
  FETCH_UNITE: 'unite/FETCH_UNITE',
  CREATE_UNITE: 'unite/CREATE_UNITE',
  UPDATE_UNITE: 'unite/UPDATE_UNITE',
  DELETE_UNITE: 'unite/DELETE_UNITE',
  RESET: 'unite/RESET',
  REPPORT: 'unite/REPPORT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUnite>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UniteState = Readonly<typeof initialState>;

// Reducer

export default (state: UniteState = initialState, action): UniteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UNITE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UNITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_UNITE):
    case REQUEST(ACTION_TYPES.UPDATE_UNITE):
    case REQUEST(ACTION_TYPES.DELETE_UNITE):
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
    case FAILURE(ACTION_TYPES.FETCH_UNITE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UNITE):
    case FAILURE(ACTION_TYPES.CREATE_UNITE):
    case FAILURE(ACTION_TYPES.UPDATE_UNITE):
    case FAILURE(ACTION_TYPES.DELETE_UNITE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNITE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNITE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_UNITE):
    case SUCCESS(ACTION_TYPES.UPDATE_UNITE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_UNITE):
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
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    default:
      return state;
  }
};

export const apiUrl = 'api/unites';

// Actions

export const getEntities: ICrudGetAllAction<IUnite> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_UNITE_LIST,
    payload: axios.get<IUnite>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IUnite> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UNITE,
    payload: axios.get<IUnite>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUnite> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UNITE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUnite> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UNITE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUnite> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UNITE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
