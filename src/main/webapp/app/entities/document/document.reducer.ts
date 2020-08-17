import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDocument, defaultValue } from 'app/shared/model/document.model';

export const ACTION_TYPES = {
  FETCH_DOCUMENT_LIST: 'document/FETCH_DOCUMENT_LIST',
  FETCH_DOCUMENT: 'document/FETCH_DOCUMENT',
  CREATE_DOCUMENT: 'document/CREATE_DOCUMENT',
  UPDATE_DOCUMENT: 'document/UPDATE_DOCUMENT',
  DELETE_DOCUMENT: 'document/DELETE_DOCUMENT',
  RESET: 'document/RESET',
  UPLOAD_DOCUMENT: 'document/UPLOAD_DOCUMENT',
  DELETE_DOCUMENT_FILE: 'document/DELETE_DOCUMENT_FILE'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDocument>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  errorUpload: null,
  uploadSuccess: false
};

export type DocumentState = Readonly<typeof initialState>;

// Reducer

export default (state: DocumentState = initialState, action): DocumentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DOCUMENT):
    case REQUEST(ACTION_TYPES.UPDATE_DOCUMENT):
    case REQUEST(ACTION_TYPES.DELETE_DOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENT):
    case FAILURE(ACTION_TYPES.CREATE_DOCUMENT):
    case FAILURE(ACTION_TYPES.UPDATE_DOCUMENT):
    case FAILURE(ACTION_TYPES.DELETE_DOCUMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOCUMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_DOCUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOCUMENT):
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
    case REQUEST(ACTION_TYPES.UPLOAD_DOCUMENT):
    case REQUEST(ACTION_TYPES.DELETE_DOCUMENT_FILE):
      return {
        ...state,
        errorUpload: null,
        uploadSuccess: false,
        updating: true
      };
    case SUCCESS(ACTION_TYPES.UPLOAD_DOCUMENT):
    case SUCCESS(ACTION_TYPES.DELETE_DOCUMENT_FILE):
      return {
        ...state,
        errorUpload: null,
        uploadSuccess: true,
        updating: false
      };
    case FAILURE(ACTION_TYPES.UPLOAD_DOCUMENT):
    case FAILURE(ACTION_TYPES.DELETE_DOCUMENT_FILE):
      return {
        ...state,
        errorUpload: action.payload,
        uploadSuccess: false,
        updating: false
      };
    default:
      return state;
  }
};

const apiUrl = 'api/documents';

// Actions

export const getEntities: ICrudGetAllAction<IDocument> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DOCUMENT_LIST,
    payload: axios.get<IDocument>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDocument> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DOCUMENT,
    payload: axios.get<IDocument>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOCUMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  // dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOCUMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDocument> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOCUMENT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const uploadDocument = (documentFile: FormData) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPLOAD_DOCUMENT,
    payload: axios.post(`${apiUrl}/uploadFile`, documentFile)
  });
  return result;
};

export const deleteDocumentFile = (documentFile: string) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOCUMENT_FILE,
    payload: axios.delete(`${apiUrl}/deleteFile/${documentFile}`)
  });
  return result;
};
