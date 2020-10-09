import axios from 'axios';
export const getReportEntity = (format: string, apiUrl: string, action: string) => async dispatch => {
  const res = await axios.get(`${apiUrl}/report/${format}`);
  const result = dispatch({
    type: action,
    payload: res
  });
  return result;
};

export const uploadFile = (file: FormData, apiUrl: string) => async dispatch => {
  const result = await dispatch({
    type: 'UPLOAD_FILE',
    payload: axios.post(`${apiUrl}/upload`, file)
  });
  console.log(result);
  if (result.value.status === 200) alert('Le fichier a été chargé avec succès');
  return result;
};
