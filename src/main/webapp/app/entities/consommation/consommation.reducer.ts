import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IConsommation, defaultValue } from 'app/shared/model/consommation.model';

export const ACTION_TYPES = {
  FETCH_CONSOMMATION_LIST: 'consommation/FETCH_CONSOMMATION_LIST',
  FETCH_CONSOMMATION: 'consommation/FETCH_CONSOMMATION',
  CREATE_CONSOMMATION: 'consommation/CREATE_CONSOMMATION',
  UPDATE_CONSOMMATION: 'consommation/UPDATE_CONSOMMATION',
  DELETE_CONSOMMATION: 'consommation/DELETE_CONSOMMATION',
  RESET: 'consommation/RESET',
  REPPORT: 'consomation/REPPORT',
  FILTER_CONSOMMATION_LIST: 'consommation/FILTER_CONSOMMATION_LIST'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConsommation>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ConsommationState = Readonly<typeof initialState>;

// Reducer

export default (state: ConsommationState = initialState, action): ConsommationState => {
  switch (action.type) {
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    case REQUEST(ACTION_TYPES.FETCH_CONSOMMATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONSOMMATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONSOMMATION):
    case REQUEST(ACTION_TYPES.UPDATE_CONSOMMATION):
    case REQUEST(ACTION_TYPES.DELETE_CONSOMMATION):
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
    case FAILURE(ACTION_TYPES.FETCH_CONSOMMATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONSOMMATION):
    case FAILURE(ACTION_TYPES.CREATE_CONSOMMATION):
    case FAILURE(ACTION_TYPES.UPDATE_CONSOMMATION):
    case FAILURE(ACTION_TYPES.DELETE_CONSOMMATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONSOMMATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONSOMMATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FILTER_CONSOMMATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONSOMMATION):
    case SUCCESS(ACTION_TYPES.UPDATE_CONSOMMATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONSOMMATION):
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

export const apiUrl = 'api/consommations';

// Actions

export const getEntities: ICrudGetAllAction<IConsommation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CONSOMMATION_LIST,
    payload: axios.get<IConsommation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const filterEntities: ICrudGetAllAction<IConsommation> = filter => ({
  type: ACTION_TYPES.FILTER_CONSOMMATION_LIST,
  payload: axios.get<IConsommation>(`${apiUrl}/search-entities/${filter}`)
});

export const getEntity: ICrudGetAction<IConsommation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONSOMMATION,
    payload: axios.get<IConsommation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IConsommation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONSOMMATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConsommation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONSOMMATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConsommation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONSOMMATION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
