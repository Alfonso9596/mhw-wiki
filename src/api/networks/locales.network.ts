import http from '@/api/http';

const LOCALES_ENDPOINTS = {
  dataLanguage: '/api/language'
};

export const getDataLanguages = async () => {
  try {
    const response = await http.get(LOCALES_ENDPOINTS.dataLanguage);
    return response?.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};
export default { getDataLanguages };