import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILigneBonCommande, defaultValue } from 'app/shared/model/ligne-bon-commande.model';

export const ACTION_TYPES = {
  FETCH_LIGNEBONCOMMANDE_LIST: 'ligneBonCommande/FETCH_LIGNEBONCOMMANDE_LIST',
  FETCH_LIGNEBONCOMMANDE: 'ligneBonCommande/FETCH_LIGNEBONCOMMANDE',
  CREATE_LIGNEBONCOMMANDE: 'ligneBonCommande/CREATE_LIGNEBONCOMMANDE',
  UPDATE_LIGNEBONCOMMANDE: 'ligneBonCommande/UPDATE_LIGNEBONCOMMANDE',
  DELETE_LIGNEBONCOMMANDE: 'ligneBonCommande/DELETE_LIGNEBONCOMMANDE',
  RESET: 'ligneBonCommande/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILigneBonCommande>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LigneBonCommandeState = Readonly<typeof initialState>;

// Reducer

export default (state: LigneBonCommandeState = initialState, action): LigneBonCommandeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIGNEBONCOMMANDE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LIGNEBONCOMMANDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LIGNEBONCOMMANDE):
    case REQUEST(ACTION_TYPES.UPDATE_LIGNEBONCOMMANDE):
    case REQUEST(ACTION_TYPES.DELETE_LIGNEBONCOMMANDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LIGNEBONCOMMANDE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LIGNEBONCOMMANDE):
    case FAILURE(ACTION_TYPES.CREATE_LIGNEBONCOMMANDE):
    case FAILURE(ACTION_TYPES.UPDATE_LIGNEBONCOMMANDE):
    case FAILURE(ACTION_TYPES.DELETE_LIGNEBONCOMMANDE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNEBONCOMMANDE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNEBONCOMMANDE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LIGNEBONCOMMANDE):
    case SUCCESS(ACTION_TYPES.UPDATE_LIGNEBONCOMMANDE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LIGNEBONCOMMANDE):
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

const apiUrl = 'api/ligne-bon-commandes';

// Actions

export const getEntities: ICrudGetAllAction<ILigneBonCommande> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNEBONCOMMANDE_LIST,
    payload: axios.get<ILigneBonCommande>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntitiesById: ICrudGetAction<ILigneBonCommande> = id => {
  const requestUrl = `${apiUrl}/${id}/lignes`;
  return {
    type: ACTION_TYPES.FETCH_LIGNEBONCOMMANDE_LIST,
    payload: axios.get<ILigneBonCommande>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<ILigneBonCommande> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNEBONCOMMANDE,
    payload: axios.get<ILigneBonCommande>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILigneBonCommande> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LIGNEBONCOMMANDE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILigneBonCommande> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LIGNEBONCOMMANDE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILigneBonCommande> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LIGNEBONCOMMANDE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
