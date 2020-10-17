import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEquipe, defaultValue } from 'app/shared/model/equipe.model';

export const ACTION_TYPES = {
  FETCH_EQUIPE_LIST: 'equipe/FETCH_EQUIPE_LIST',
  FETCH_EQUIPE: 'equipe/FETCH_EQUIPE',
  CREATE_EQUIPE: 'equipe/CREATE_EQUIPE',
  UPDATE_EQUIPE: 'equipe/UPDATE_EQUIPE',
  DELETE_EQUIPE: 'equipe/DELETE_EQUIPE',
  RESET: 'equipe/RESET',
  REPPORT: 'equipe/REPPORT',
  FILTER_EQUIPE_LIST: 'equipe/filter'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEquipe>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EquipeState = Readonly<typeof initialState>;

// Reducer

export default (state: EquipeState = initialState, action): EquipeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EQUIPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EQUIPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EQUIPE):
    case REQUEST(ACTION_TYPES.UPDATE_EQUIPE):
    case REQUEST(ACTION_TYPES.DELETE_EQUIPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EQUIPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EQUIPE):
    case FAILURE(ACTION_TYPES.CREATE_EQUIPE):
    case FAILURE(ACTION_TYPES.UPDATE_EQUIPE):
    case FAILURE(ACTION_TYPES.DELETE_EQUIPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EQUIPE):
    case SUCCESS(ACTION_TYPES.UPDATE_EQUIPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FILTER_EQUIPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case REQUEST(ACTION_TYPES.REPPORT):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.DELETE_EQUIPE):
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
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    default:
      return state;
  }
};

export const apiUrl = 'api/equipes';

// Actions

export const getEntities: ICrudGetAllAction<IEquipe> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EQUIPE_LIST,
    payload: axios.get<IEquipe>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const filterEntities: ICrudGetAllAction<IEquipe> = filter => ({
  type: ACTION_TYPES.FILTER_EQUIPE_LIST,
  payload: axios.get<IEquipe>(`${apiUrl}/search-entities/${filter}`)
});

export const getEntity: ICrudGetAction<IEquipe> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EQUIPE,
    payload: axios.get<IEquipe>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEquipe> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EQUIPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEquipe> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EQUIPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEquipe> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EQUIPE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
