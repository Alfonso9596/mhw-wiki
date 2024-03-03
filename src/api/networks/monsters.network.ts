import http from '@/api/http';
import { getParamsFromPath, getPathWithParams, convertParamsToURL } from '@/helpers/url.helper';

const MONSTER_ENDPOINTS = {
  pageableMonsters: '/api/:lang/monsters',
  allMonsters: '/api/:lang/monsters/all'
};

const getPageableMonsters = async (
  lang: string,
  params?: any
) => {
  try {
    let path = MONSTER_ENDPOINTS.pageableMonsters;
    if (getParamsFromPath(path)?.length) {
      path = getPathWithParams(path, {
        ...params,
        lang
      });
    }
    if (params) {
      const convertedParams = convertParamsToURL(params);
      path = `${path}?${convertedParams}`;
    }
    const response = await http.get(path);
    return response?.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const getAllMonsters = async(
  lang: string,
  params?: any
) => {
  try {
    let path = MONSTER_ENDPOINTS.allMonsters;
    if (getParamsFromPath(path)?.length) {
      path = getPathWithParams(path, {
        ...params,
        lang
      });
    }
    if (params) {
      const convertedParams = convertParamsToURL(params);
      path = `${path}?${convertedParams}`;
    }
    const response = await http.get(path);
    return response?.data;
  } catch(e) {
    console.error(e);
    return false;
  }
};

export { getPageableMonsters, getAllMonsters, MONSTER_ENDPOINTS };
export default { getAllMonsters };