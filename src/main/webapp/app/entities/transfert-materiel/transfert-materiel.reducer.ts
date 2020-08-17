import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITransfertMateriel, defaultValue } from 'app/shared/model/transfert-materiel.model';

export const ACTION_TYPES = {
  FETCH_TRANSFERTMATERIEL_LIST: 'transfertMateriel/FETCH_TRANSFERTMATERIEL_LIST',
  FETCH_TRANSFERTMATERIEL: 'transfertMateriel/FETCH_TRANSFERTMATERIEL',
  CREATE_TRANSFERTMATERIEL: 'transfertMateriel/CREATE_TRANSFERTMATERIEL',
  UPDATE_TRANSFERTMATERIEL: 'transfertMateriel/UPDATE_TRANSFERTMATERIEL',
  DELETE_TRANSFERTMATERIEL: 'transfertMateriel/DELETE_TRANSFERTMATERIEL',
  RESET: 'transfertMateriel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITransfertMateriel>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TransfertMaterielState = Readonly<typeof initialState>;

// Reducer

export default (state: TransfertMaterielState = initialState, action): TransfertMaterielState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRANSFERTMATERIEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRANSFERTMATERIEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRANSFERTMATERIEL):
    case REQUEST(ACTION_TYPES.UPDATE_TRANSFERTMATERIEL):
    case REQUEST(ACTION_TYPES.DELETE_TRANSFERTMATERIEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRANSFERTMATERIEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRANSFERTMATERIEL):
    case FAILURE(ACTION_TYPES.CREATE_TRANSFERTMATERIEL):
    case FAILURE(ACTION_TYPES.UPDATE_TRANSFERTMATERIEL):
    case FAILURE(ACTION_TYPES.DELETE_TRANSFERTMATERIEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSFERTMATERIEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSFERTMATERIEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRANSFERTMATERIEL):
    case SUCCESS(ACTION_TYPES.UPDATE_TRANSFERTMATERIEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRANSFERTMATERIEL):
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

const apiUrl = 'api/transfert-materiels';

// Actions

export const getEntities: ICrudGetAllAction<ITransfertMateriel> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSFERTMATERIEL_LIST,
    payload: axios.get<ITransfertMateriel>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITransfertMateriel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSFERTMATERIEL,
    payload: axios.get<ITransfertMateriel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITransfertMateriel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRANSFERTMATERIEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITransfertMateriel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRANSFERTMATERIEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITransfertMateriel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRANSFERTMATERIEL,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
