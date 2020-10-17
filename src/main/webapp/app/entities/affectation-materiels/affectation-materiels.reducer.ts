import axios, { AxiosResponse } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAffectationMateriels, defaultValue } from 'app/shared/model/affectation-materiels.model';

export const ACTION_TYPES = {
  FETCH_AFFECTATIONMATERIELS_LIST: 'affectationMateriels/FETCH_AFFECTATIONMATERIELS_LIST',
  FETCH_AFFECTATIONMATERIELS: 'affectationMateriels/FETCH_AFFECTATIONMATERIELS',
  CREATE_AFFECTATIONMATERIELS: 'affectationMateriels/CREATE_AFFECTATIONMATERIELS',
  UPDATE_AFFECTATIONMATERIELS: 'affectationMateriels/UPDATE_AFFECTATIONMATERIELS',
  DELETE_AFFECTATIONMATERIELS: 'affectationMateriels/DELETE_AFFECTATIONMATERIELS',
  RESET: 'affectationMateriels/RESET',
  REPPORT: 'affectationMateriels/REPPORT',
  FILTER: 'affectationMateriels/FILTER'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAffectationMateriels>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AffectationMaterielsState = Readonly<typeof initialState>;

// Reducer

export default (state: AffectationMaterielsState = initialState, action): AffectationMaterielsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AFFECTATIONMATERIELS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AFFECTATIONMATERIELS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AFFECTATIONMATERIELS):
    case REQUEST(ACTION_TYPES.UPDATE_AFFECTATIONMATERIELS):
    case REQUEST(ACTION_TYPES.DELETE_AFFECTATIONMATERIELS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AFFECTATIONMATERIELS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AFFECTATIONMATERIELS):
    case FAILURE(ACTION_TYPES.CREATE_AFFECTATIONMATERIELS):
    case FAILURE(ACTION_TYPES.UPDATE_AFFECTATIONMATERIELS):
    case FAILURE(ACTION_TYPES.DELETE_AFFECTATIONMATERIELS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFFECTATIONMATERIELS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFFECTATIONMATERIELS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AFFECTATIONMATERIELS):
    case SUCCESS(ACTION_TYPES.UPDATE_AFFECTATIONMATERIELS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AFFECTATIONMATERIELS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case SUCCESS(ACTION_TYPES.FILTER):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const apiUrl = 'api/affectation-materiels';

// Actions
export const getEntities: (keyword, page, size, sort) => { payload: Promise<AxiosResponse<IAffectationMateriels>>; type: string } = (
  keyword,
  page,
  size,
  sort
) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AFFECTATIONMATERIELS,
    payload: axios.get<IAffectationMateriels>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const searchInEntities: ICrudGetAction<IAffectationMateriels> = keyword => {
  const requestUrl = `${apiUrl}/search-entities/${keyword}`;
  return {
    type: ACTION_TYPES.FETCH_AFFECTATIONMATERIELS,
    payload: axios.get<IAffectationMateriels>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IAffectationMateriels> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AFFECTATIONMATERIELS,
    payload: axios.get<IAffectationMateriels>(requestUrl)
  };
};

export const filterEntities: ICrudGetAllAction<IAffectationMateriels> = filter => ({
  type: ACTION_TYPES.FILTER,
  payload: axios.get<IAffectationMateriels>(`${apiUrl}/search-entities/${filter}`)
});

export const createEntity: ICrudPutAction<IAffectationMateriels> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AFFECTATIONMATERIELS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  // dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAffectationMateriels> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AFFECTATIONMATERIELS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  // dispatch(getEntities());

  return result;
};

export const deleteEntity: ICrudDeleteAction<IAffectationMateriels> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AFFECTATIONMATERIELS,
    payload: axios.delete(requestUrl)
  });
  // dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
