import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBonReception, defaultValue } from 'app/shared/model/bon-reception.model';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { ICurrency } from 'app/shared/model/currency';

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
  entities: [] as ReadonlyArray<ICurrency>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CurrenciesState = Readonly<typeof initialState>;

// Reducer

export default (state: CurrenciesState = initialState, action): CurrenciesState => {
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

export const getEntities: ICrudGetAllAction<ICurrency> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/currencies`;
  return {
    type: ACTION_TYPES.FETCH_BONRECEPTION_LIST,
    payload: axios.get<ICurrency>(`${requestUrl}`)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
