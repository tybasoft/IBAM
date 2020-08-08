import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFichePointage, defaultValue } from 'app/shared/model/fiche-pointage.model';

export const ACTION_TYPES = {
  FETCH_FICHEPOINTAGE_LIST: 'fichePointage/FETCH_FICHEPOINTAGE_LIST',
  FETCH_FICHEPOINTAGE: 'fichePointage/FETCH_FICHEPOINTAGE',
  CREATE_FICHEPOINTAGE: 'fichePointage/CREATE_FICHEPOINTAGE',
  UPDATE_FICHEPOINTAGE: 'fichePointage/UPDATE_FICHEPOINTAGE',
  DELETE_FICHEPOINTAGE: 'fichePointage/DELETE_FICHEPOINTAGE',
  RESET: 'fichePointage/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFichePointage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FichePointageState = Readonly<typeof initialState>;

// Reducer

export default (state: FichePointageState = initialState, action): FichePointageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FICHEPOINTAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FICHEPOINTAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FICHEPOINTAGE):
    case REQUEST(ACTION_TYPES.UPDATE_FICHEPOINTAGE):
    case REQUEST(ACTION_TYPES.DELETE_FICHEPOINTAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FICHEPOINTAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FICHEPOINTAGE):
    case FAILURE(ACTION_TYPES.CREATE_FICHEPOINTAGE):
    case FAILURE(ACTION_TYPES.UPDATE_FICHEPOINTAGE):
    case FAILURE(ACTION_TYPES.DELETE_FICHEPOINTAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FICHEPOINTAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FICHEPOINTAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FICHEPOINTAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_FICHEPOINTAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FICHEPOINTAGE):
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

const apiUrl = 'api/fiche-pointages';

// Actions

export const getEntities: ICrudGetAllAction<IFichePointage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FICHEPOINTAGE_LIST,
  payload: axios.get<IFichePointage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFichePointage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FICHEPOINTAGE,
    payload: axios.get<IFichePointage>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFichePointage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FICHEPOINTAGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFichePointage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FICHEPOINTAGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFichePointage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FICHEPOINTAGE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
