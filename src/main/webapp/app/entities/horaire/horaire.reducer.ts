import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHoraire, defaultValue } from 'app/shared/model/horaire.model';

export const ACTION_TYPES = {
  FETCH_HORAIRE_LIST: 'horaire/FETCH_HORAIRE_LIST',
  FETCH_HORAIRE: 'horaire/FETCH_HORAIRE',
  CREATE_HORAIRE: 'horaire/CREATE_HORAIRE',
  UPDATE_HORAIRE: 'horaire/UPDATE_HORAIRE',
  DELETE_HORAIRE: 'horaire/DELETE_HORAIRE',
  RESET: 'horaire/RESET',
  REPPORT: 'horaire/REPPORT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHoraire>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type HoraireState = Readonly<typeof initialState>;

// Reducer

export default (state: HoraireState = initialState, action): HoraireState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HORAIRE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HORAIRE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HORAIRE):
    case REQUEST(ACTION_TYPES.UPDATE_HORAIRE):
    case REQUEST(ACTION_TYPES.DELETE_HORAIRE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HORAIRE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HORAIRE):
    case FAILURE(ACTION_TYPES.CREATE_HORAIRE):
    case FAILURE(ACTION_TYPES.UPDATE_HORAIRE):
    case FAILURE(ACTION_TYPES.DELETE_HORAIRE):
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
    case SUCCESS(ACTION_TYPES.FETCH_HORAIRE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HORAIRE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HORAIRE):
    case SUCCESS(ACTION_TYPES.UPDATE_HORAIRE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HORAIRE):
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

export const apiUrl = 'api/horaires';

// Actions

export const getEntities: ICrudGetAllAction<IHoraire> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HORAIRE_LIST,
  payload: axios.get<IHoraire>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IHoraire> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HORAIRE,
    payload: axios.get<IHoraire>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHoraire> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HORAIRE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHoraire> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HORAIRE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHoraire> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HORAIRE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
