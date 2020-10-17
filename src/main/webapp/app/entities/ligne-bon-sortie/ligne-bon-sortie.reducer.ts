import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILigneBonSortie, defaultValue } from 'app/shared/model/ligne-bon-sortie.model';
import { ILigneBonReception } from 'app/shared/model/ligne-bon-reception.model';

export const ACTION_TYPES = {
  FETCH_LIGNEBONSORTIE_LIST: 'ligneBonSortie/FETCH_LIGNEBONSORTIE_LIST',
  FETCH_LIGNEBONSORTIE: 'ligneBonSortie/FETCH_LIGNEBONSORTIE',
  RESET: 'ligneBonSortie/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILigneBonSortie>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LigneBonSortieState = Readonly<typeof initialState>;

// Reducer

export default (state: LigneBonSortieState = initialState, action): LigneBonSortieState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIGNEBONSORTIE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LIGNEBONSORTIE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LIGNEBONSORTIE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LIGNEBONSORTIE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNEBONSORTIE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNEBONSORTIE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/ligne-bon-sorties';

// Actions

export const getEntities: ICrudGetAllAction<ILigneBonSortie> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNEBONSORTIE_LIST,
    payload: axios.get<ILigneBonSortie>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ILigneBonSortie> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNEBONSORTIE,
    payload: axios.get<ILigneBonSortie>(requestUrl)
  };
};
export const getEntitiesById: ICrudGetAction<ILigneBonSortie> = id => {
  const requestUrl = `${apiUrl}/${id}/lignes`;
  return {
    type: ACTION_TYPES.FETCH_LIGNEBONSORTIE_LIST,
    payload: axios.get<ILigneBonSortie>(requestUrl)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
