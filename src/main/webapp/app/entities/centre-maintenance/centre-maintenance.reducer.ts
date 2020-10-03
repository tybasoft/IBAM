import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICentreMaintenance, defaultValue } from 'app/shared/model/centre-maintenance.model';

export const ACTION_TYPES = {
  FETCH_CENTREMAINTENANCE_LIST: 'centreMaintenance/FETCH_CENTREMAINTENANCE_LIST',
  FETCH_CENTREMAINTENANCE: 'centreMaintenance/FETCH_CENTREMAINTENANCE',
  CREATE_CENTREMAINTENANCE: 'centreMaintenance/CREATE_CENTREMAINTENANCE',
  UPDATE_CENTREMAINTENANCE: 'centreMaintenance/UPDATE_CENTREMAINTENANCE',
  DELETE_CENTREMAINTENANCE: 'centreMaintenance/DELETE_CENTREMAINTENANCE',
  RESET: 'centreMaintenance/RESET',
  REPPORT: 'centreMaintenance/REPPORT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICentreMaintenance>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CentreMaintenanceState = Readonly<typeof initialState>;

// Reducer

export default (state: CentreMaintenanceState = initialState, action): CentreMaintenanceState => {
  switch (action.type) {
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    case REQUEST(ACTION_TYPES.FETCH_CENTREMAINTENANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CENTREMAINTENANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CENTREMAINTENANCE):
    case REQUEST(ACTION_TYPES.UPDATE_CENTREMAINTENANCE):
    case REQUEST(ACTION_TYPES.DELETE_CENTREMAINTENANCE):
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
    case FAILURE(ACTION_TYPES.FETCH_CENTREMAINTENANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CENTREMAINTENANCE):
    case FAILURE(ACTION_TYPES.CREATE_CENTREMAINTENANCE):
    case FAILURE(ACTION_TYPES.UPDATE_CENTREMAINTENANCE):
    case FAILURE(ACTION_TYPES.DELETE_CENTREMAINTENANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CENTREMAINTENANCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CENTREMAINTENANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CENTREMAINTENANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_CENTREMAINTENANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CENTREMAINTENANCE):
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

export const apiUrl = 'api/centre-maintenances';

// Actions

export const getEntities: ICrudGetAllAction<ICentreMaintenance> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CENTREMAINTENANCE_LIST,
    payload: axios.get<ICentreMaintenance>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICentreMaintenance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CENTREMAINTENANCE,
    payload: axios.get<ICentreMaintenance>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICentreMaintenance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CENTREMAINTENANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICentreMaintenance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CENTREMAINTENANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());

  return result;
};

export const deleteEntity: ICrudDeleteAction<ICentreMaintenance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CENTREMAINTENANCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());

  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
