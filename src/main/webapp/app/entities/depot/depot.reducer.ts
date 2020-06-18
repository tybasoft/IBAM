import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDepot, defaultValue } from 'app/shared/model/depot.model';

export const ACTION_TYPES = {
  FETCH_DEPOT_LIST: 'depot/FETCH_DEPOT_LIST',
  FETCH_DEPOT: 'depot/FETCH_DEPOT',
  CREATE_DEPOT: 'depot/CREATE_DEPOT',
  UPDATE_DEPOT: 'depot/UPDATE_DEPOT',
  DELETE_DEPOT: 'depot/DELETE_DEPOT',
  RESET: 'depot/RESET',
  REPPORT: 'depot/REPPORT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDepot>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DepotState = Readonly<typeof initialState>;

// Reducer

export default (state: DepotState = initialState, action): DepotState => {
  switch (action.type) {
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    case REQUEST(ACTION_TYPES.FETCH_DEPOT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEPOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DEPOT):
    case REQUEST(ACTION_TYPES.UPDATE_DEPOT):
    case REQUEST(ACTION_TYPES.DELETE_DEPOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DEPOT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEPOT):
    case FAILURE(ACTION_TYPES.CREATE_DEPOT):
    case FAILURE(ACTION_TYPES.UPDATE_DEPOT):
    case FAILURE(ACTION_TYPES.DELETE_DEPOT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEPOT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEPOT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DEPOT):
    case SUCCESS(ACTION_TYPES.UPDATE_DEPOT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEPOT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case REQUEST(ACTION_TYPES.REPPORT):
      return {
        ...state,
        loading: true
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const apiUrl = 'api/depots';

// Actions

export const getEntities: ICrudGetAllAction<IDepot> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DEPOT_LIST,
  payload: axios.get<IDepot>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDepot> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEPOT,
    payload: axios.get<IDepot>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDepot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DEPOT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDepot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEPOT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDepot> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DEPOT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
