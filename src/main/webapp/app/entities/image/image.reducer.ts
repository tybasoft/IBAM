import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImage, defaultValue } from 'app/shared/model/image.model';

export const ACTION_TYPES = {
  FETCH_IMAGE_LIST: 'image/FETCH_IMAGE_LIST',
  FETCH_IMAGE: 'image/FETCH_IMAGE',
  CREATE_IMAGE: 'image/CREATE_IMAGE',
  UPDATE_IMAGE: 'image/UPDATE_IMAGE',
  DELETE_IMAGE: 'image/DELETE_IMAGE',
  RESET: 'image/RESET',
  UPLOAD_IMAGE: 'image/UPLOAD_IMAGE',
  DELETE_IMAGE_FILE: 'image/DELETE_IMAGE_FILE',
  REPPORT: 'image/REPPORT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImage>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  errorUpload: null,
  uploadSuccess: false
};

export type ImageState = Readonly<typeof initialState>;

// Reducer

export default (state: ImageState = initialState, action): ImageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST('UPLOAD_FILE'):
      return { ...state };
    case REQUEST(ACTION_TYPES.CREATE_IMAGE):
    case REQUEST(ACTION_TYPES.UPDATE_IMAGE):
    case REQUEST(ACTION_TYPES.DELETE_IMAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IMAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMAGE):
    case FAILURE(ACTION_TYPES.CREATE_IMAGE):
    case FAILURE(ACTION_TYPES.UPDATE_IMAGE):
    case FAILURE(ACTION_TYPES.DELETE_IMAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_IMAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMAGE):
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
    case REQUEST(ACTION_TYPES.UPLOAD_IMAGE):
    case REQUEST(ACTION_TYPES.DELETE_IMAGE_FILE):
      return {
        ...state,
        errorUpload: null,
        uploadSuccess: false,
        updating: true
      };
    case SUCCESS(ACTION_TYPES.UPLOAD_IMAGE):
    case SUCCESS(ACTION_TYPES.DELETE_IMAGE_FILE):
      return {
        ...state,
        errorUpload: null,
        uploadSuccess: true,
        updating: false
      };
    case REQUEST(ACTION_TYPES.REPPORT):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.UPLOAD_IMAGE):
    case FAILURE(ACTION_TYPES.DELETE_IMAGE_FILE):
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

export const apiUrl = 'api/images';

// Actions

export const getEntities: ICrudGetAllAction<IImage> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_IMAGE_LIST,
    payload: axios.get<IImage>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IImage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMAGE,
    payload: axios.get<IImage>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IImage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMAGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  // dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMAGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMAGE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const uploadImage = (imageFile: FormData) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPLOAD_IMAGE,
    payload: axios.post(`${apiUrl}/uploadFile`, imageFile)
  });
  return result;
};

export const deleteImageFile = (imageFile: string) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMAGE_FILE,
    payload: axios.delete(`${apiUrl}/deleteFile/${imageFile}`)
  });
  return result;
};
