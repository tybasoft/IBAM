import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFournisseur, defaultValue } from 'app/shared/model/fournisseur.model';

export const ACTION_TYPES = {
  FETCH_FOURNISSEUR_LIST: 'fournisseur/FETCH_FOURNISSEUR_LIST',
  FETCH_FOURNISSEUR: 'fournisseur/FETCH_FOURNISSEUR',
  CREATE_FOURNISSEUR: 'fournisseur/CREATE_FOURNISSEUR',
  UPDATE_FOURNISSEUR: 'fournisseur/UPDATE_FOURNISSEUR',
  DELETE_FOURNISSEUR: 'fournisseur/DELETE_FOURNISSEUR',
  RESET: 'fournisseur/RESET',
  REPPORT: 'fournisseur/REPPORT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFournisseur>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FournisseurState = Readonly<typeof initialState>;

// Reducer

export default (state: FournisseurState = initialState, action): FournisseurState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOURNISSEUR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOURNISSEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FOURNISSEUR):
    case REQUEST(ACTION_TYPES.UPDATE_FOURNISSEUR):
    case REQUEST(ACTION_TYPES.DELETE_FOURNISSEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOURNISSEUR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOURNISSEUR):
    case FAILURE(ACTION_TYPES.CREATE_FOURNISSEUR):
    case FAILURE(ACTION_TYPES.UPDATE_FOURNISSEUR):
    case FAILURE(ACTION_TYPES.DELETE_FOURNISSEUR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case REQUEST(ACTION_TYPES.REPPORT):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOURNISSEUR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOURNISSEUR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOURNISSEUR):
    case SUCCESS(ACTION_TYPES.UPDATE_FOURNISSEUR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOURNISSEUR):
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

export const apiUrl = 'api/fournisseurs';

// Actions

export const getEntities: ICrudGetAllAction<IFournisseur> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FOURNISSEUR_LIST,
    payload: axios.get<IFournisseur>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IFournisseur> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOURNISSEUR,
    payload: axios.get<IFournisseur>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFournisseur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOURNISSEUR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFournisseur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOURNISSEUR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFournisseur> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOURNISSEUR,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
