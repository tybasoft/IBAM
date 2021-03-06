import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFichePointage, defaultValue } from 'app/shared/model/fiche-pointage.model';
import { IPointage } from 'app/shared/model/pointage.model';

export const ACTION_TYPES = {
  FETCH_FICHEPOINTAGE_LIST: 'fichePointage/FETCH_FICHEPOINTAGE_LIST',
  FETCH_FICHEPOINTAGE: 'fichePointage/FETCH_FICHEPOINTAGE',
  CREATE_FICHEPOINTAGE: 'fichePointage/CREATE_FICHEPOINTAGE',
  UPDATE_FICHEPOINTAGE: 'fichePointage/UPDATE_FICHEPOINTAGE',
  DELETE_FICHEPOINTAGE: 'fichePointage/DELETE_FICHEPOINTAGE',
  RESET: 'fichePointage/RESET',
  FETCH_POINTAGEBYFICHE_LIST: 'fichePointage/FETCH_POINTAGEBYFICHE_LIST'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFichePointage>,
  entitiespointage: [] as ReadonlyArray<IPointage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0
};

export type FichePointageState = Readonly<typeof initialState>;

// Reducer

export default (state: FichePointageState = initialState, action): FichePointageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FICHEPOINTAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_POINTAGEBYFICHE_LIST):
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
    case FAILURE(ACTION_TYPES.FETCH_POINTAGEBYFICHE_LIST):
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
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };

    case SUCCESS(ACTION_TYPES.FETCH_POINTAGEBYFICHE_LIST):
      return {
        ...state,
        loading: false,
        entitiespointage: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
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

export const getEntitiesPointage: ICrudGetAllAction<IPointage> = id => ({
  type: ACTION_TYPES.FETCH_POINTAGEBYFICHE_LIST,
  payload: axios.get<IPointage>(`${apiUrl}/${id}/listPointageOfFiche`)
});
