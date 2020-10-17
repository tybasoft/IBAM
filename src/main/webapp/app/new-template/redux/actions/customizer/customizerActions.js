import axios from 'axios';
import { getSession } from 'app/shared/reducers/authentication.ts';
const apiUrl = 'api/theme';

export const sidebarImage = img => async dispatch => {
  const result = await dispatch({
    type: 'BG_IMAGE',
    payload: axios.post(apiUrl, { sidebarBackgroundImage: img })
  });
  return result;
};

export const handleLayout = layoutColor => dispatch => {
  return dispatch({
    type: 'LAYOUT_COLOR',
    layoutColor: axios.post(apiUrl, { layoutColor })
  });
  // return result;
};

export const sidebarImageUrl = imgurl => dispatch => {
  axios.post(apiUrl, { sidebarBackgroundImageURL: imgurl }).then(() => dispatch(getSession()));

  return dispatch({
    type: 'BG_IMAGE_URL',
    imgurl
  });
};

export const sidebarBgColor = color => dispatch => {
  axios.post(apiUrl, { sidebarBackgroundColor: color }).then(() => dispatch(getSession()));

  return {
    type: 'BG_COLOR',
    color
  };
};

export const sidebarCollapsed = collapsed => dispatch => {
  axios.post(apiUrl, { sidebarCollapsed: collapsed }).then(() => dispatch(getSession()));
  return {
    type: 'SIDEBAR_COLLAPSED',
    collapsed
  };
};

export const sidebarSize = size => dispatch => {
  axios.post(apiUrl, { sidebarSize: size }).then(() => dispatch(getSession()));

  return {
    type: 'SIDEBAR_SIZE',
    size
  };
};
