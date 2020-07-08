import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMaintenance, defaultValue } from 'app/shared/model/maintenance.model';

export const ACTION_TYPES = {
  FETCH_MAINTENANCE_LIST: 'maintenance/FETCH_MAINTENANCE_LIST',
  FETCH_MAINTENANCE: 'maintenance/FETCH_MAINTENANCE',
  CREATE_MAINTENANCE: 'maintenance/CREATE_MAINTENANCE',
  UPDATE_MAINTENANCE: 'maintenance/UPDATE_MAINTENANCE',
  DELETE_MAINTENANCE: 'maintenance/DELETE_MAINTENANCE',
  RESET: 'maintenance/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMaintenance>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MaintenanceState = Readonly<typeof initialState>;

// Reducer

export default (state: MaintenanceState = initialState, action): MaintenanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MAINTENANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MAINTENANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MAINTENANCE):
    case REQUEST(ACTION_TYPES.UPDATE_MAINTENANCE):
    case REQUEST(ACTION_TYPES.DELETE_MAINTENANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MAINTENANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MAINTENANCE):
    case FAILURE(ACTION_TYPES.CREATE_MAINTENANCE):
    case FAILURE(ACTION_TYPES.UPDATE_MAINTENANCE):
    case FAILURE(ACTION_TYPES.DELETE_MAINTENANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAINTENANCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAINTENANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MAINTENANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_MAINTENANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MAINTENANCE):
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

export const apiUrl = 'api/maintenances';

// Actions

export const getEntities: ICrudGetAllAction<IMaintenance> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MAINTENANCE_LIST,
    payload: axios.get<IMaintenance>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMaintenance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MAINTENANCE,
    payload: axios.get<IMaintenance>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMaintenance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MAINTENANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMaintenance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MAINTENANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMaintenance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MAINTENANCE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
