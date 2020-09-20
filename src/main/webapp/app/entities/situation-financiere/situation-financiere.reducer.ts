import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISituationFinanciere, defaultValue } from 'app/shared/model/situation-financiere.model';

export const ACTION_TYPES = {
  FETCH_SITUATIONFINANCIERE_LIST: 'situationFinanciere/FETCH_SITUATIONFINANCIERE_LIST',
  FETCH_SITUATIONFINANCIERE: 'situationFinanciere/FETCH_SITUATIONFINANCIERE',
  CREATE_SITUATIONFINANCIERE: 'situationFinanciere/CREATE_SITUATIONFINANCIERE',
  UPDATE_SITUATIONFINANCIERE: 'situationFinanciere/UPDATE_SITUATIONFINANCIERE',
  DELETE_SITUATIONFINANCIERE: 'situationFinanciere/DELETE_SITUATIONFINANCIERE',
  RESET: 'situationFinanciere/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISituationFinanciere>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SituationFinanciereState = Readonly<typeof initialState>;

// Reducer

export default (state: SituationFinanciereState = initialState, action): SituationFinanciereState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SITUATIONFINANCIERE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SITUATIONFINANCIERE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SITUATIONFINANCIERE):
    case REQUEST(ACTION_TYPES.UPDATE_SITUATIONFINANCIERE):
    case REQUEST(ACTION_TYPES.DELETE_SITUATIONFINANCIERE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SITUATIONFINANCIERE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SITUATIONFINANCIERE):
    case FAILURE(ACTION_TYPES.CREATE_SITUATIONFINANCIERE):
    case FAILURE(ACTION_TYPES.UPDATE_SITUATIONFINANCIERE):
    case FAILURE(ACTION_TYPES.DELETE_SITUATIONFINANCIERE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SITUATIONFINANCIERE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SITUATIONFINANCIERE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SITUATIONFINANCIERE):
    case SUCCESS(ACTION_TYPES.UPDATE_SITUATIONFINANCIERE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SITUATIONFINANCIERE):
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

const apiUrl = 'api/situation-financieres';

// Actions

export const getEntities: ICrudGetAllAction<ISituationFinanciere> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SITUATIONFINANCIERE_LIST,
    payload: axios.get<ISituationFinanciere>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISituationFinanciere> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SITUATIONFINANCIERE,
    payload: axios.get<ISituationFinanciere>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISituationFinanciere> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SITUATIONFINANCIERE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISituationFinanciere> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SITUATIONFINANCIERE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISituationFinanciere> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SITUATIONFINANCIERE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
