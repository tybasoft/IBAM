import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILigneStockDisponible, defaultValue } from 'app/shared/model/ligne-stock-disponible.model';

export const ACTION_TYPES = {
  FETCH_LIGNESTOCKDISPONIBLE_LIST: 'ligneStockDisponible/FETCH_LIGNESTOCKDISPONIBLE_LIST',
  FETCH_LIGNESTOCKDISPONIBLE: 'ligneStockDisponible/FETCH_LIGNESTOCKDISPONIBLE',
  CREATE_LIGNESTOCKDISPONIBLE: 'ligneStockDisponible/CREATE_LIGNESTOCKDISPONIBLE',
  UPDATE_LIGNESTOCKDISPONIBLE: 'ligneStockDisponible/UPDATE_LIGNESTOCKDISPONIBLE',
  DELETE_LIGNESTOCKDISPONIBLE: 'ligneStockDisponible/DELETE_LIGNESTOCKDISPONIBLE',
  RESET: 'ligneStockDisponible/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILigneStockDisponible>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LigneStockDisponibleState = Readonly<typeof initialState>;

// Reducer

export default (state: LigneStockDisponibleState = initialState, action): LigneStockDisponibleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIGNESTOCKDISPONIBLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LIGNESTOCKDISPONIBLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LIGNESTOCKDISPONIBLE):
    case REQUEST(ACTION_TYPES.UPDATE_LIGNESTOCKDISPONIBLE):
    case REQUEST(ACTION_TYPES.DELETE_LIGNESTOCKDISPONIBLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LIGNESTOCKDISPONIBLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LIGNESTOCKDISPONIBLE):
    case FAILURE(ACTION_TYPES.CREATE_LIGNESTOCKDISPONIBLE):
    case FAILURE(ACTION_TYPES.UPDATE_LIGNESTOCKDISPONIBLE):
    case FAILURE(ACTION_TYPES.DELETE_LIGNESTOCKDISPONIBLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNESTOCKDISPONIBLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNESTOCKDISPONIBLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LIGNESTOCKDISPONIBLE):
    case SUCCESS(ACTION_TYPES.UPDATE_LIGNESTOCKDISPONIBLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LIGNESTOCKDISPONIBLE):
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

const apiUrl = 'api/ligne-stock-disponibles';

// Actions

export const getEntities: ICrudGetAllAction<ILigneStockDisponible> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNESTOCKDISPONIBLE_LIST,
    payload: axios.get<ILigneStockDisponible>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ILigneStockDisponible> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNESTOCKDISPONIBLE,
    payload: axios.get<ILigneStockDisponible>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILigneStockDisponible> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LIGNESTOCKDISPONIBLE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILigneStockDisponible> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LIGNESTOCKDISPONIBLE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILigneStockDisponible> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LIGNESTOCKDISPONIBLE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
