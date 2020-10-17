import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITypeMateriel, defaultValue } from 'app/shared/model/type-materiel.model';

export const ACTION_TYPES = {
  FETCH_TYPEMATERIEL_LIST: 'typeMateriel/FETCH_TYPEMATERIEL_LIST',
  FETCH_TYPEMATERIEL: 'typeMateriel/FETCH_TYPEMATERIEL',
  CREATE_TYPEMATERIEL: 'typeMateriel/CREATE_TYPEMATERIEL',
  UPDATE_TYPEMATERIEL: 'typeMateriel/UPDATE_TYPEMATERIEL',
  DELETE_TYPEMATERIEL: 'typeMateriel/DELETE_TYPEMATERIEL',
  RESET: 'typeMateriel/RESET',
  REPPORT: 'typeMateriel/REPPORT',
  FILTER: 'typeMateriel/filter'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITypeMateriel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TypeMaterielState = Readonly<typeof initialState>;

// Reducer

export default (state: TypeMaterielState = initialState, action): TypeMaterielState => {
  switch (action.type) {
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    case REQUEST(ACTION_TYPES.FETCH_TYPEMATERIEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TYPEMATERIEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TYPEMATERIEL):
    case REQUEST(ACTION_TYPES.UPDATE_TYPEMATERIEL):
    case REQUEST(ACTION_TYPES.DELETE_TYPEMATERIEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TYPEMATERIEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TYPEMATERIEL):
    case FAILURE(ACTION_TYPES.CREATE_TYPEMATERIEL):
    case FAILURE(ACTION_TYPES.UPDATE_TYPEMATERIEL):
    case FAILURE(ACTION_TYPES.DELETE_TYPEMATERIEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TYPEMATERIEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TYPEMATERIEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FILTER):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TYPEMATERIEL):
    case SUCCESS(ACTION_TYPES.UPDATE_TYPEMATERIEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TYPEMATERIEL):
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
    default:
      return state;
  }
};

export const apiUrl = 'api/type-materiels';

// Actions

export const getEntities: ICrudGetAllAction<ITypeMateriel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TYPEMATERIEL_LIST,
  payload: axios.get<ITypeMateriel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITypeMateriel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TYPEMATERIEL,
    payload: axios.get<ITypeMateriel>(requestUrl)
  };
};

export const filterEntities: ICrudGetAllAction<ITypeMateriel> = filter => ({
  type: ACTION_TYPES.FILTER,
  payload: axios.get<ITypeMateriel>(`${apiUrl}/search-entities/${filter}`)
});

export const createEntity: ICrudPutAction<ITypeMateriel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TYPEMATERIEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITypeMateriel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TYPEMATERIEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());

  return result;
};

export const deleteEntity: ICrudDeleteAction<ITypeMateriel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TYPEMATERIEL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());

  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
