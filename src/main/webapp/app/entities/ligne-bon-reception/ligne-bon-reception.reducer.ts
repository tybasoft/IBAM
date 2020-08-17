import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILigneBonReception, defaultValue } from 'app/shared/model/ligne-bon-reception.model';

export const ACTION_TYPES = {
  FETCH_LIGNEBONRECEPTION_LIST: 'ligneBonReception/FETCH_LIGNEBONRECEPTION_LIST',
  FETCH_LIGNEBONRECEPTION: 'ligneBonReception/FETCH_LIGNEBONRECEPTION',
  CREATE_LIGNEBONRECEPTION: 'ligneBonReception/CREATE_LIGNEBONRECEPTION',
  UPDATE_LIGNEBONRECEPTION: 'ligneBonReception/UPDATE_LIGNEBONRECEPTION',
  DELETE_LIGNEBONRECEPTION: 'ligneBonReception/DELETE_LIGNEBONRECEPTION',
  RESET: 'ligneBonReception/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILigneBonReception>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LigneBonReceptionState = Readonly<typeof initialState>;

// Reducer

export default (state: LigneBonReceptionState = initialState, action): LigneBonReceptionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIGNEBONRECEPTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LIGNEBONRECEPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LIGNEBONRECEPTION):
    case REQUEST(ACTION_TYPES.UPDATE_LIGNEBONRECEPTION):
    case REQUEST(ACTION_TYPES.DELETE_LIGNEBONRECEPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LIGNEBONRECEPTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LIGNEBONRECEPTION):
    case FAILURE(ACTION_TYPES.CREATE_LIGNEBONRECEPTION):
    case FAILURE(ACTION_TYPES.UPDATE_LIGNEBONRECEPTION):
    case FAILURE(ACTION_TYPES.DELETE_LIGNEBONRECEPTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNEBONRECEPTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNEBONRECEPTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LIGNEBONRECEPTION):
    case SUCCESS(ACTION_TYPES.UPDATE_LIGNEBONRECEPTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LIGNEBONRECEPTION):
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

const apiUrl = 'api/ligne-bon-receptions';

// Actions

export const getEntities: ICrudGetAllAction<ILigneBonReception> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNEBONRECEPTION_LIST,
    payload: axios.get<ILigneBonReception>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ILigneBonReception> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNEBONRECEPTION,
    payload: axios.get<ILigneBonReception>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILigneBonReception> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LIGNEBONRECEPTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILigneBonReception> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LIGNEBONRECEPTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILigneBonReception> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LIGNEBONRECEPTION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
