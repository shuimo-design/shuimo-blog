/**
 * @description
 * @author 阿怪
 * @date 2024/1/8 22:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { sAxios } from '~/server/tools/sAxios';


export default defineEventHandler(async event => {
  if (event.context.params) {
    const title = event.context.params.title;
    const data = await sAxios(`/yuque/details/${title}`);
    if (data) {
      return data.data ?? {};
    }
  }


  return {};
});
