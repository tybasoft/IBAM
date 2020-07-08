import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmploye, defaultValue } from 'app/shared/model/employe.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYE_LIST: 'employe/FETCH_EMPLOYE_LIST',
  FILTER_EMPLOYE_BY_PID: 'employe/FILTER_EMPLOYE_BY_PID'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmploye>,
  currList: [] as ReadonlyArray<IEmploye>,
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
    case REQUEST(ACTION_TYPES.FILTER_EMPLOYE_BY_PID):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYE_LIST):
    case FAILURE(ACTION_TYPES.FILTER_EMPLOYE_BY_PID):
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
        currList: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FILTER_EMPLOYE_BY_PID):
      return {
        ...state,
        loading: false,
        currList: action.payload.entities,
        projectid: action.payload.projectid
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

/* 
    projectid : projectid,
    items  : projectid === '' ? employes: employes.filter((el) => el.projet && el.projet.id && (el.projet.id ===projectid))
  
    */

export const filterEmployees = (employes, projectid) => dispatch => {
  /* dispatch({
    type: ACTION_TYPES.FILTER_EMPLOYE_BY_PID,
    payload: {
      projectid:projectid,
      entities: employes
     
    },
  }); */
};

/* projectid === ""
          ? employes
          : employes.filter(
              (x) => x.projet.id.indexOf(projectid.toUpperCase()) >= 0
            ),
            */
