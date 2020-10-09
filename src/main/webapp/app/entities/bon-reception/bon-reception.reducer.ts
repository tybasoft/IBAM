import axios, { AxiosResponse } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBonReception, defaultValue } from 'app/shared/model/bon-reception.model';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { ICurrency } from 'app/shared/model/currency';
import { url } from 'inspector';

export const ACTION_TYPES = {
  FETCH_BONRECEPTION_LIST: 'bonReception/FETCH_BONRECEPTION_LIST',
  FETCH_BONRECEPTION: 'bonReception/FETCH_BONRECEPTION',
  CREATE_BONRECEPTION: 'bonReception/CREATE_BONRECEPTION',
  UPDATE_BONRECEPTION: 'bonReception/UPDATE_BONRECEPTION',
  DELETE_BONRECEPTION: 'bonReception/DELETE_BONRECEPTION',
  RESET: 'bonReception/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBonReception>,
  currenciesList: [] as ReadonlyArray<ICurrency>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BonReceptionState = Readonly<typeof initialState>;

// Reducer

export default (state: BonReceptionState = initialState, action): BonReceptionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BONRECEPTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BONRECEPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BONRECEPTION):
    case REQUEST(ACTION_TYPES.UPDATE_BONRECEPTION):
    case REQUEST(ACTION_TYPES.DELETE_BONRECEPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BONRECEPTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BONRECEPTION):
    case FAILURE(ACTION_TYPES.CREATE_BONRECEPTION):
    case FAILURE(ACTION_TYPES.UPDATE_BONRECEPTION):
    case FAILURE(ACTION_TYPES.DELETE_BONRECEPTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BONRECEPTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BONRECEPTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BONRECEPTION):
    case SUCCESS(ACTION_TYPES.UPDATE_BONRECEPTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BONRECEPTION):
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

const apiUrl = 'api/bon-receptions';
const date = new Date(Date.now()).toLocaleString().split(',');

// Actions

export const getEntities: ICrudGetAllAction<IBonReception> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BONRECEPTION_LIST,
    payload: axios.get<IBonReception>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getCurrencies: ICrudGetAllAction<IBonReception> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/currencies`;
  return {
    type: ACTION_TYPES.FETCH_BONRECEPTION_LIST,
    payload: axios.get<IBonReception>(`${requestUrl}`)
  };
};

export const getEntitiesById: ICrudGetAction<IBonReception> = id => {
  const requestUrl = `${apiUrl}/${id}/lignes`;
  return {
    type: ACTION_TYPES.FETCH_BONRECEPTION,
    payload: axios.get<IBonReception>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IBonReception> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BONRECEPTION,
    payload: axios.get<IBonReception>(requestUrl)
  };
};

// export const getImageEntity: ICrudGetAction<IBonReception> =id  => {
//   const requestUrl = `/api/images/${id}`;
//   return {
//     type: ACTION_TYPES.FETCH_BONRECEPTION,
//     payload: axios.get<IBonReception>(requestUrl)
//   };
// };
// export const getImageEntity: ICrudPutAction<IBonReception> = id => async dispatch => {
//   const requestUrl = `${apiUrl}/image/${id}`;
//   const result = await dispatch({
//     type: ACTION_TYPES.FETCH_BONRECEPTION,
//     payload: axios.get(requestUrl)
//   });
//   return result;
// };
// export const getImageEntity: ICrudPutAction<IBonReception> = id => async dispatch => {
//   const requestUrl = `${apiUrl}/image/${id}`;
//   let imageurl='';
//   axios({
//     url: requestUrl,
//     method: 'GET',
//     responseType: 'blob' // important
//   }).then(response => {
//     const url = window.URL.createObjectURL(new Blob([response.data])); // const link = document.createElement('a'); // link.href = url; // link.setAttribute('download', 'Bon_Reception' + date + '.pdf'); // document.body.appendChild(link); // link.click();
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'image.jpg');
//     document.body.appendChild(link);
//     link.click();
//   });
//
// };

export const createEntity: ICrudPutAction<IBonReception> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BONRECEPTION,
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
    link.setAttribute('download', 'Bon_Reception' + date + '.pdf');
    document.body.appendChild(link);
    link.click();
  });
};

export const updateEntity: ICrudPutAction<IBonReception> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BONRECEPTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBonReception> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BONRECEPTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
