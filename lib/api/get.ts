import axios, { AxiosResponse } from 'axios';

const API_DOMAIN = 'https://catch-back.herokuapp.com/';

const getClassificationResult = async (imageID: number) => {
  try {
    const response: AxiosResponse<any> = await axios({
      baseURL: API_DOMAIN,
      url: `/image/${imageID}`,
      method: 'get',
    });
    console.log(
      '[SUCCESS] GET IMAGE CLASSIFICATION RESULT',
      response.data.data,
    );
    return response.data.data;
  } catch (e) {
    console.log('[FAIL] GET IMAGE CLASSIFICATION RESULT', e);
    return e;
  }
};

const getApi = {
  getClassificationResult,
};
export default getApi;
