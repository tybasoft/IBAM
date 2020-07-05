import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITva, defaultValue } from 'app/shared/model/tva.model';

export const ACTION_TYPES = {
  FETCH_TVA_LIST: 'tva/FETCH_TVA_LIST',
  FETCH_TVA: 'tva/FETCH_TVA',
  CREATE_TVA: 'tva/CREATE_TVA',
  UPDATE_TVA: 'tva/UPDATE_TVA',
  DELETE_TVA: 'tva/DELETE_TVA',

  REPORT: 'tva/REPORT',
  RESET: 'tva/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITva>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TvaState = Readonly<typeof initialState>;

// Reducer

export default (state: TvaState = initialState, action): TvaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TVA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TVA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.REPORT):
      return {
        ...state,
        loading: true
      };

    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    case REQUEST(ACTION_TYPES.CREATE_TVA):
    case REQUEST(ACTION_TYPES.UPDATE_TVA):
    case REQUEST(ACTION_TYPES.DELETE_TVA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TVA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TVA):
    case FAILURE(ACTION_TYPES.CREATE_TVA):
    case FAILURE(ACTION_TYPES.UPDATE_TVA):
    case FAILURE(ACTION_TYPES.DELETE_TVA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TVA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TVA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TVA):
    case SUCCESS(ACTION_TYPES.UPDATE_TVA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TVA):
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

export const apiUrl = 'api/tvas';

// Actions

export const getEntities: ICrudGetAllAction<ITva> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TVA_LIST,
  payload: axios.get<ITva>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITva> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TVA,
    payload: axios.get<ITva>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITva> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TVA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITva> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TVA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITva> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TVA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
