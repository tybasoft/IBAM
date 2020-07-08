import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMateriel, defaultValue } from 'app/shared/model/materiel.model';

export const ACTION_TYPES = {
  FETCH_MATERIEL_LIST: 'materiel/FETCH_MATERIEL_LIST',
  FETCH_MATERIEL: 'materiel/FETCH_MATERIEL',
  CREATE_MATERIEL: 'materiel/CREATE_MATERIEL',
  UPDATE_MATERIEL: 'materiel/UPDATE_MATERIEL',
  DELETE_MATERIEL: 'materiel/DELETE_MATERIEL',
  RESET: 'materiel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMateriel>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MaterielState = Readonly<typeof initialState>;

// Reducer

export default (state: MaterielState = initialState, action): MaterielState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MATERIEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MATERIEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MATERIEL):
    case REQUEST(ACTION_TYPES.UPDATE_MATERIEL):
    case REQUEST(ACTION_TYPES.DELETE_MATERIEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MATERIEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MATERIEL):
    case FAILURE(ACTION_TYPES.CREATE_MATERIEL):
    case FAILURE(ACTION_TYPES.UPDATE_MATERIEL):
    case FAILURE(ACTION_TYPES.DELETE_MATERIEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATERIEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATERIEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MATERIEL):
    case SUCCESS(ACTION_TYPES.UPDATE_MATERIEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MATERIEL):
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

const apiUrl = 'api/materiels';
// Actions

export const getEntities: ICrudGetAllAction<IMateriel> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MATERIEL_LIST,
    payload: axios.get<IMateriel>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMateriel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MATERIEL,
    payload: axios.get<IMateriel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMateriel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MATERIEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMateriel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MATERIEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMateriel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MATERIEL,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
