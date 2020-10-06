import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBonCommande, defaultValue } from 'app/shared/model/bon-commande.model';

export const ACTION_TYPES = {
  FETCH_BONCOMMANDE_LIST: 'bonCommande/FETCH_BONCOMMANDE_LIST',
  FETCH_BONCOMMANDE: 'bonCommande/FETCH_BONCOMMANDE',
  CREATE_BONCOMMANDE: 'bonCommande/CREATE_BONCOMMANDE',
  UPDATE_BONCOMMANDE: 'bonCommande/UPDATE_BONCOMMANDE',
  DELETE_BONCOMMANDE: 'bonCommande/DELETE_BONCOMMANDE',
  RESET: 'bonCommande/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBonCommande>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BonCommandeState = Readonly<typeof initialState>;

// Reducer

export default (state: BonCommandeState = initialState, action): BonCommandeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BONCOMMANDE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BONCOMMANDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BONCOMMANDE):
    case REQUEST(ACTION_TYPES.UPDATE_BONCOMMANDE):
    case REQUEST(ACTION_TYPES.DELETE_BONCOMMANDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BONCOMMANDE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BONCOMMANDE):
    case FAILURE(ACTION_TYPES.CREATE_BONCOMMANDE):
    case FAILURE(ACTION_TYPES.UPDATE_BONCOMMANDE):
    case FAILURE(ACTION_TYPES.DELETE_BONCOMMANDE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BONCOMMANDE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BONCOMMANDE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BONCOMMANDE):
    case SUCCESS(ACTION_TYPES.UPDATE_BONCOMMANDE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BONCOMMANDE):
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

const apiUrl = 'api/bon-commandes';
const date = new Date(Date.now()).toLocaleString().split(',');

// Actions

export const getEntities: ICrudGetAllAction<IBonCommande> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BONCOMMANDE_LIST,
    payload: axios.get<IBonCommande>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntitiesById: ICrudGetAction<IBonCommande> = id => {
  const requestUrl = `${apiUrl}/${id}/lignes`;
  return {
    type: ACTION_TYPES.FETCH_BONCOMMANDE,
    payload: axios.get<IBonCommande>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IBonCommande> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BONCOMMANDE,
    payload: axios.get<IBonCommande>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBonCommande> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BONCOMMANDE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};
export const getReportEntity: (id) => void = id => {
  const requestUrl = `${apiUrl}/report/${id}`;
  axios({
    url: requestUrl,
    method: 'GET',
    responseType: 'blob' // important
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bon_Commande' + date + '.pdf');
    document.body.appendChild(link);
    link.click();
  });
};

// export const createBonCommande: (entity, ligne) => (dispatch) => Promise<any> = (entity, ligne) => async dispatch => {
//   const result = await dispatch({
//     type: ACTION_TYPES.CREATE_BONCOMMANDE,
//     payload: axios.post(apiUrl, entity,ligne),
//   });
//   dispatch(getEntities());
//   return result;
// };

export const updateEntity: ICrudPutAction<IBonCommande> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BONCOMMANDE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBonCommande> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BONCOMMANDE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
