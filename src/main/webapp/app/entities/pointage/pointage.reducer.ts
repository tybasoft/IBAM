import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPointage, defaultValue } from 'app/shared/model/pointage.model';

export const ACTION_TYPES = {
  FETCH_POINTAGE_LIST: 'pointage/FETCH_POINTAGE_LIST',
  FETCH_POINTAGE: 'pointage/FETCH_POINTAGE',
  CREATE_POINTAGE: 'pointage/CREATE_POINTAGE',
  UPDATE_POINTAGE: 'pointage/UPDATE_POINTAGE',
  DELETE_POINTAGE: 'pointage/DELETE_POINTAGE',
  CREATE_POINTAGE_LIST: 'pointage/CREATE_POINTAGE_LIST',
  RESET: 'pointage/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPointage>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PointageState = Readonly<typeof initialState>;

// Reducer

export default (state: PointageState = initialState, action): PointageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_POINTAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_POINTAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_POINTAGE):
    case REQUEST(ACTION_TYPES.CREATE_POINTAGE_LIST):
    case REQUEST(ACTION_TYPES.UPDATE_POINTAGE):
    case REQUEST(ACTION_TYPES.DELETE_POINTAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_POINTAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_POINTAGE):
    case FAILURE(ACTION_TYPES.CREATE_POINTAGE):
    case FAILURE(ACTION_TYPES.CREATE_POINTAGE_LIST):
    case FAILURE(ACTION_TYPES.UPDATE_POINTAGE):
    case FAILURE(ACTION_TYPES.DELETE_POINTAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_POINTAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_POINTAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_POINTAGE):
    case SUCCESS(ACTION_TYPES.CREATE_POINTAGE_LIST):
    case SUCCESS(ACTION_TYPES.UPDATE_POINTAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_POINTAGE):
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

const apiUrl = 'api/pointages';

// Actions

export const getEntities: ICrudGetAllAction<IPointage> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_POINTAGE_LIST,
    payload: axios.get<IPointage>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPointage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_POINTAGE,
    payload: axios.get<IPointage>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPointage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_POINTAGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPointage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_POINTAGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPointage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_POINTAGE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const CreateList = (tab: any[]) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_POINTAGE_LIST,
    payload: axios.post(`${apiUrl}/createPointageList`, tab)
  });
  dispatch(getEntities());
  return result;
};
