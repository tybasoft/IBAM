import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompteRendu, defaultValue } from 'app/shared/model/compte-rendu.model';

export const ACTION_TYPES = {
  FETCH_COMPTERENDU_LIST: 'compteRendu/FETCH_COMPTERENDU_LIST',
  FETCH_COMPTERENDU: 'compteRendu/FETCH_COMPTERENDU',
  CREATE_COMPTERENDU: 'compteRendu/CREATE_COMPTERENDU',
  UPDATE_COMPTERENDU: 'compteRendu/UPDATE_COMPTERENDU',
  DELETE_COMPTERENDU: 'compteRendu/DELETE_COMPTERENDU',
  RESET: 'compteRendu/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompteRendu>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CompteRenduState = Readonly<typeof initialState>;

// Reducer

export default (state: CompteRenduState = initialState, action): CompteRenduState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPTERENDU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPTERENDU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPTERENDU):
    case REQUEST(ACTION_TYPES.UPDATE_COMPTERENDU):
    case REQUEST(ACTION_TYPES.DELETE_COMPTERENDU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPTERENDU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPTERENDU):
    case FAILURE(ACTION_TYPES.CREATE_COMPTERENDU):
    case FAILURE(ACTION_TYPES.UPDATE_COMPTERENDU):
    case FAILURE(ACTION_TYPES.DELETE_COMPTERENDU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPTERENDU_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPTERENDU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPTERENDU):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPTERENDU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPTERENDU):
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

const apiUrl = 'api/compte-rendus';

// Actions

export const getEntities: ICrudGetAllAction<ICompteRendu> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COMPTERENDU_LIST,
    payload: axios.get<ICompteRendu>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICompteRendu> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPTERENDU,
    payload: axios.get<ICompteRendu>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICompteRendu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPTERENDU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompteRendu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPTERENDU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompteRendu> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPTERENDU,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
