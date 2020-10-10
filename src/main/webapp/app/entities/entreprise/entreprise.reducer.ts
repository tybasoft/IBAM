import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEntreprise, defaultValue } from 'app/shared/model/entreprise.model';

export const ACTION_TYPES = {
  FETCH_ENTREPRISE_LIST: 'entreprise/FETCH_ENTREPRISE_LIST',
  FETCH_ENTREPRISE: 'entreprise/FETCH_ENTREPRISE',
  CREATE_ENTREPRISE: 'entreprise/CREATE_ENTREPRISE',
  UPDATE_ENTREPRISE: 'entreprise/UPDATE_ENTREPRISE',
  DELETE_ENTREPRISE: 'entreprise/DELETE_ENTREPRISE',
  RESET: 'entreprise/RESET',
  REPPORT: 'entreprise/REPPORT',
  FILTER_ENTREPRISE_LIST: 'entreprise/FILTER'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEntreprise>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0
};

export type EntrepriseState = Readonly<typeof initialState>;

// Reducer

export default (state: EntrepriseState = initialState, action): EntrepriseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ENTREPRISE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENTREPRISE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.FILTER_ENTREPRISE_LIST):
      return {
        ...state,
        loading: true
        // entities: null
      };
    case REQUEST(ACTION_TYPES.CREATE_ENTREPRISE):
    case REQUEST(ACTION_TYPES.UPDATE_ENTREPRISE):
    case REQUEST(ACTION_TYPES.DELETE_ENTREPRISE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ENTREPRISE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENTREPRISE):
    case FAILURE(ACTION_TYPES.CREATE_ENTREPRISE):
    case FAILURE(ACTION_TYPES.UPDATE_ENTREPRISE):
    case FAILURE(ACTION_TYPES.DELETE_ENTREPRISE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENTREPRISE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
        // totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENTREPRISE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENTREPRISE):
    case SUCCESS(ACTION_TYPES.UPDATE_ENTREPRISE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENTREPRISE):
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
    case SUCCESS(ACTION_TYPES.FILTER_ENTREPRISE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    default:
      return state;
  }
};

export const apiUrl = 'api/entreprises';

// Actions

export const getEntities: ICrudGetAllAction<IEntreprise> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;

  return {
    type: ACTION_TYPES.FETCH_ENTREPRISE_LIST,
    payload: axios.get<IEntreprise>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const filterEntities: ICrudGetAllAction<IEntreprise> = filter => ({
  type: ACTION_TYPES.FILTER_ENTREPRISE_LIST,
  payload: axios.get<IEntreprise>(`${apiUrl}/search-entities/${filter}`)
});

export const getEntity: ICrudGetAction<IEntreprise> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENTREPRISE,
    payload: axios.get<IEntreprise>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEntreprise> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENTREPRISE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEntreprise> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ENTREPRISE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());

  return result;
};

export const deleteEntity: ICrudDeleteAction<IEntreprise> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ENTREPRISE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
