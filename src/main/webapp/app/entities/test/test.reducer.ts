import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmploye, defaultValue } from 'app/shared/model/employe.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYE_LIST: 'employe/FETCH_EMPLOYE_LIST'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmploye>,
  entity: defaultValue,
  projectid: '',
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EmployeState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeState = initialState, action): EmployeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYE_LIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYE_LIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };

    default:
      return state;
  }
};

const apiUrl = 'api/employes';

// Actions

export const getEntities: ICrudGetAllAction<IEmploye> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYE_LIST,
    payload: axios.get<IEmploye>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};
