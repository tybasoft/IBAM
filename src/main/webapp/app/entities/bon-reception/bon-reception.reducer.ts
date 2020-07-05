import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBonReception, defaultValue } from 'app/shared/model/bon-reception.model';

export const ACTION_TYPES = {
  FETCH_BONRECEPTION_LIST: 'bonReception/FETCH_BONRECEPTION_LIST',
  FETCH_BONRECEPTION: 'bonReception/FETCH_BONRECEPTION',
  CREATE_BONRECEPTION: 'bonReception/CREATE_BONRECEPTION',
  UPDATE_BONRECEPTION: 'bonReception/UPDATE_BONRECEPTION',
  DELETE_BONRECEPTION: 'bonReception/DELETE_BONRECEPTION',
  RESET: 'bonReception/RESET',
  REPPORT: 'bonReception/REPPORT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBonReception>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BonReceptionState = Readonly<typeof initialState>;

// Reducer

export default (state: BonReceptionState = initialState, action): BonReceptionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BONRECEPTION_LIST):
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    case REQUEST(ACTION_TYPES.FETCH_BONRECEPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BONRECEPTION):
    case REQUEST(ACTION_TYPES.UPDATE_BONRECEPTION):
    case REQUEST(ACTION_TYPES.DELETE_BONRECEPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BONRECEPTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BONRECEPTION):
    case FAILURE(ACTION_TYPES.CREATE_BONRECEPTION):
    case FAILURE(ACTION_TYPES.UPDATE_BONRECEPTION):
    case FAILURE(ACTION_TYPES.DELETE_BONRECEPTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case REQUEST(ACTION_TYPES.REPPORT):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.FETCH_BONRECEPTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BONRECEPTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BONRECEPTION):
    case SUCCESS(ACTION_TYPES.UPDATE_BONRECEPTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BONRECEPTION):
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

export const apiUrl = 'api/bon-receptions';

// Actions

export const getEntities: ICrudGetAllAction<IBonReception> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BONRECEPTION_LIST,
    payload: axios.get<IBonReception>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IBonReception> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BONRECEPTION,
    payload: axios.get<IBonReception>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBonReception> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BONRECEPTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBonReception> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BONRECEPTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBonReception> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BONRECEPTION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
