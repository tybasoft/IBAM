import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAvancement, defaultValue } from 'app/shared/model/avancement.model';

export const ACTION_TYPES = {
  FETCH_AVANCEMENT_LIST: 'avancement/FETCH_AVANCEMENT_LIST',
  FETCH_AVANCEMENT: 'avancement/FETCH_AVANCEMENT',
  CREATE_AVANCEMENT: 'avancement/CREATE_AVANCEMENT',
  UPDATE_AVANCEMENT: 'avancement/UPDATE_AVANCEMENT',
  DELETE_AVANCEMENT: 'avancement/DELETE_AVANCEMENT',
  SET_BLOB: 'avancement/SET_BLOB',
  RESET: 'avancement/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAvancement>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AvancementState = Readonly<typeof initialState>;

// Reducer

export default (state: AvancementState = initialState, action): AvancementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AVANCEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AVANCEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AVANCEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_AVANCEMENT):
    case REQUEST(ACTION_TYPES.DELETE_AVANCEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AVANCEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AVANCEMENT):
    case FAILURE(ACTION_TYPES.CREATE_AVANCEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_AVANCEMENT):
    case FAILURE(ACTION_TYPES.DELETE_AVANCEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVANCEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVANCEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AVANCEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_AVANCEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AVANCEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/avancements';

// Actions

export const getEntities: ICrudGetAllAction<IAvancement> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AVANCEMENT_LIST,
    payload: axios.get<IAvancement>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IAvancement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AVANCEMENT,
    payload: axios.get<IAvancement>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAvancement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AVANCEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAvancement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AVANCEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAvancement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AVANCEMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
