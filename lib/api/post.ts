import axios, { AxiosResponse } from 'axios';

const API_DOMAIN =
  'http://ec2-54-180-120-246.ap-northeast-2.compute.amazonaws.com/';

const postImageFile = async (imgFile: File) => {
  console.log(imgFile);
  const formData = new FormData();
  formData.append('image', imgFile);
  try {
    const response: AxiosResponse<any> = await axios({
      baseURL: API_DOMAIN,
      url: `/upload`,
      method: 'post',
      data: formData,
    });
    console.log(response.data.data);
    console.log('[SUCCESS] POST IMAGE FILE', response.data.data);
    return response.data.data;
  } catch (e) {
    console.log('[FAIL] GET IMAGE FILE', e);
    return e;
  }
};

const postApi = {
  postImageFile,
};
export default postApi;