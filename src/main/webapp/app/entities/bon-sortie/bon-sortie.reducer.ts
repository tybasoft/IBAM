import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBonSortie, defaultValue } from 'app/shared/model/bon-sortie.model';

export const ACTION_TYPES = {
  FETCH_BONSORTIE_LIST: 'bonSortie/FETCH_BONSORTIE_LIST',
  FETCH_BONSORTIE: 'bonSortie/FETCH_BONSORTIE',
  CREATE_BONSORTIE: 'bonSortie/CREATE_BONSORTIE',
  UPDATE_BONSORTIE: 'bonSortie/UPDATE_BONSORTIE',
  DELETE_BONSORTIE: 'bonSortie/DELETE_BONSORTIE',
  RESET: 'bonSortie/RESET',
  FILTER: 'bonSortie/FILTER',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBonSortie>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BonSortieState = Readonly<typeof initialState>;

// Reducer

export default (state: BonSortieState = initialState, action): BonSortieState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BONSORTIE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BONSORTIE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BONSORTIE):
    case REQUEST(ACTION_TYPES.UPDATE_BONSORTIE):
    case REQUEST(ACTION_TYPES.DELETE_BONSORTIE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BONSORTIE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BONSORTIE):
    case FAILURE(ACTION_TYPES.CREATE_BONSORTIE):
    case FAILURE(ACTION_TYPES.UPDATE_BONSORTIE):
    case FAILURE(ACTION_TYPES.DELETE_BONSORTIE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BONSORTIE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BONSORTIE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BONSORTIE):
    case SUCCESS(ACTION_TYPES.UPDATE_BONSORTIE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BONSORTIE):
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

export const apiUrl = 'api/bon-sorties';
const date = new Date(Date.now()).toLocaleString().split(',');

// Actions

export const getEntities: ICrudGetAllAction<IBonSortie> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BONSORTIE_LIST,
    payload: axios.get<IBonSortie>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const filterEntities: ICrudGetAllAction<IBonSortie> = filter => ({
  type: ACTION_TYPES.FILTER,
  payload: axios.get<IBonSortie>(`${apiUrl}/search-entities/${filter}`)
});

export const getEntity: ICrudGetAction<IBonSortie> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BONSORTIE,
    payload: axios.get<IBonSortie>(requestUrl)
  };
};

export const getReportEntity: (id) => void = id => {
  const requestUrl = `${apiUrl}/report/${id}`;
  axios({
    url: requestUrl,
    method: 'GET',
    responseType: 'blob' // important
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bon_Sortie' + date + '.pdf');
    document.body.appendChild(link);
    link.click();
  });
};

export const createEntity: ICrudPutAction<IBonSortie> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BONSORTIE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBonSortie> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BONSORTIE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBonSortie> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BONSORTIE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
