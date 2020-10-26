import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlanification, defaultValue } from 'app/shared/model/planification.model';

export const ACTION_TYPES = {
  FETCH_PLANIFICATION_LIST: 'planification/FETCH_PLANIFICATION_LIST',
  FETCH_PLANIFICATION: 'planification/FETCH_PLANIFICATION',
  CREATE_PLANIFICATION: 'planification/CREATE_PLANIFICATION',
  UPDATE_PLANIFICATION: 'planification/UPDATE_PLANIFICATION',
  DELETE_PLANIFICATION: 'planification/DELETE_PLANIFICATION',
  GET_EMP_TASKS: 'planification/GET_EMP_TASKS',
  RESET: 'planification/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlanification>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PlanificationState = Readonly<typeof initialState>;

// Reducer

export default (state: PlanificationState = initialState, action): PlanificationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLANIFICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLANIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PLANIFICATION):
    case REQUEST(ACTION_TYPES.UPDATE_PLANIFICATION):
    case REQUEST(ACTION_TYPES.DELETE_PLANIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PLANIFICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLANIFICATION):
    case FAILURE(ACTION_TYPES.CREATE_PLANIFICATION):
    case FAILURE(ACTION_TYPES.UPDATE_PLANIFICATION):
    case FAILURE(ACTION_TYPES.DELETE_PLANIFICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANIFICATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANIFICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLANIFICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_PLANIFICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLANIFICATION):
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

const apiUrl = 'api/planifications';

// Actions

export const getEntities: ICrudGetAllAction<IPlanification> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PLANIFICATION_LIST,
    payload: axios.get<IPlanification>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEmployeTasks: any = id => {
  const requestUrl = `${apiUrl}/employe/${id}`;

  return { type: ACTION_TYPES.GET_EMP_TASKS, payload: axios.get<IPlanification>(requestUrl) };
};

export const getEntity: ICrudGetAction<IPlanification> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLANIFICATION,
    payload: axios.get<IPlanification>(requestUrl)
  };
};

export const createEntity = entity => {
  console.log(entity);
  axios.post(apiUrl, cleanEntity(entity));
};

export const updateEntity: ICrudPutAction<IPlanification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLANIFICATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlanification> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLANIFICATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
