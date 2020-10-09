import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVisiteTechnique, defaultValue } from 'app/shared/model/visite-technique.model';

export const ACTION_TYPES = {
  FETCH_VISITETECHNIQUE_LIST: 'visiteTechnique/FETCH_VISITETECHNIQUE_LIST',
  FETCH_VISITETECHNIQUE: 'visiteTechnique/FETCH_VISITETECHNIQUE',
  CREATE_VISITETECHNIQUE: 'visiteTechnique/CREATE_VISITETECHNIQUE',
  UPDATE_VISITETECHNIQUE: 'visiteTechnique/UPDATE_VISITETECHNIQUE',
  DELETE_VISITETECHNIQUE: 'visiteTechnique/DELETE_VISITETECHNIQUE',
  RESET: 'visiteTechnique/RESET',
  REPPORT: 'visiteTechnique/REPPORT',
  FILTER_VISITE_TECHNIQUE_LIST: 'visiteTechnique/filter'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVisiteTechnique>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VisiteTechniqueState = Readonly<typeof initialState>;

// Reducer

export default (state: VisiteTechniqueState = initialState, action): VisiteTechniqueState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VISITETECHNIQUE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VISITETECHNIQUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VISITETECHNIQUE):
    case REQUEST(ACTION_TYPES.UPDATE_VISITETECHNIQUE):
    case REQUEST(ACTION_TYPES.DELETE_VISITETECHNIQUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case REQUEST(ACTION_TYPES.REPPORT):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VISITETECHNIQUE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VISITETECHNIQUE):
    case FAILURE(ACTION_TYPES.CREATE_VISITETECHNIQUE):
    case FAILURE(ACTION_TYPES.UPDATE_VISITETECHNIQUE):
    case FAILURE(ACTION_TYPES.DELETE_VISITETECHNIQUE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISITETECHNIQUE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISITETECHNIQUE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VISITETECHNIQUE):
    case SUCCESS(ACTION_TYPES.UPDATE_VISITETECHNIQUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VISITETECHNIQUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case SUCCESS(ACTION_TYPES.FILTER_VISITE_TECHNIQUE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
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

export const apiUrl = 'api/visite-techniques';

// Actions

export const getEntities: ICrudGetAllAction<IVisiteTechnique> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VISITETECHNIQUE_LIST,
    payload: axios.get<IVisiteTechnique>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const filterEntities: ICrudGetAllAction<IVisiteTechnique> = filter => ({
  type: ACTION_TYPES.FILTER_VISITE_TECHNIQUE_LIST,
  payload: axios.get<IVisiteTechnique>(`${apiUrl}/search-entities/${filter}`)
});

export const getEntity: ICrudGetAction<IVisiteTechnique> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VISITETECHNIQUE,
    payload: axios.get<IVisiteTechnique>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVisiteTechnique> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VISITETECHNIQUE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVisiteTechnique> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VISITETECHNIQUE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVisiteTechnique> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VISITETECHNIQUE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
