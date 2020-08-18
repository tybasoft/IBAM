import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAffectationsMateriels, defaultValue } from 'app/shared/model/affectations-materiels.model';

export const ACTION_TYPES = {
  FETCH_AFFECTATIONSMATERIELS_LIST: 'affectationsMateriels/FETCH_AFFECTATIONSMATERIELS_LIST',
  FETCH_AFFECTATIONSMATERIELS: 'affectationsMateriels/FETCH_AFFECTATIONSMATERIELS',
  CREATE_AFFECTATIONSMATERIELS: 'affectationsMateriels/CREATE_AFFECTATIONSMATERIELS',
  UPDATE_AFFECTATIONSMATERIELS: 'affectationsMateriels/UPDATE_AFFECTATIONSMATERIELS',
  DELETE_AFFECTATIONSMATERIELS: 'affectationsMateriels/DELETE_AFFECTATIONSMATERIELS',
  RESET: 'affectationsMateriels/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAffectationsMateriels>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AffectationsMaterielsState = Readonly<typeof initialState>;

// Reducer

export default (state: AffectationsMaterielsState = initialState, action): AffectationsMaterielsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AFFECTATIONSMATERIELS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AFFECTATIONSMATERIELS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AFFECTATIONSMATERIELS):
    case REQUEST(ACTION_TYPES.UPDATE_AFFECTATIONSMATERIELS):
    case REQUEST(ACTION_TYPES.DELETE_AFFECTATIONSMATERIELS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AFFECTATIONSMATERIELS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AFFECTATIONSMATERIELS):
    case FAILURE(ACTION_TYPES.CREATE_AFFECTATIONSMATERIELS):
    case FAILURE(ACTION_TYPES.UPDATE_AFFECTATIONSMATERIELS):
    case FAILURE(ACTION_TYPES.DELETE_AFFECTATIONSMATERIELS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFFECTATIONSMATERIELS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFFECTATIONSMATERIELS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AFFECTATIONSMATERIELS):
    case SUCCESS(ACTION_TYPES.UPDATE_AFFECTATIONSMATERIELS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AFFECTATIONSMATERIELS):
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

const apiUrl = 'api/affectations-materiels';

// Actions

export const getEntities: ICrudGetAllAction<IAffectationsMateriels> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AFFECTATIONSMATERIELS_LIST,
    payload: axios.get<IAffectationsMateriels>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};
export const searchInEntities: ICrudGetAllAction<IAffectationsMateriels> = () => {
  return {
    type: ACTION_TYPES.FETCH_AFFECTATIONSMATERIELS_LIST,
    payload: axios.get<IAffectationsMateriels>(`${apiUrl}/search-entities`)
  };
};

export const getEntity: ICrudGetAction<IAffectationsMateriels> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AFFECTATIONSMATERIELS,
    payload: axios.get<IAffectationsMateriels>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAffectationsMateriels> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AFFECTATIONSMATERIELS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAffectationsMateriels> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AFFECTATIONSMATERIELS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAffectationsMateriels> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AFFECTATIONSMATERIELS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
