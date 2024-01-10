/**
 * @description
 * @author 阿怪
 * @date 2024/1/8 22:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import axios from 'axios';

const { public:publicConfig } = useRuntimeConfig();
export const sAxios = axios.create({
  baseURL: publicConfig.NUXT_ENV_SERVER as string ?? '/'
});
