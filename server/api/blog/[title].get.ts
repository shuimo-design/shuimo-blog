/**
 * @description
 * @author 阿怪
 * @date 2024/1/8 22:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { blogs } from '~/server/mocks/_mock_data_';
import { article1 } from '~/server/mocks/blogs/1';
import { article2 } from '~/server/mocks/blogs/2';

const blogHTML: Record<number, string> = {
  1: article1,
  2: article2
};

export default defineEventHandler(async event => {
  if (event.context.params) {
    const title = event.context.params.title;
    const blog = blogs.data.find(e => e.title === title);
    if (blog) {
      blog.bodyHtml = blogHTML[blog.id] ?? '暂无数据';
      return blog;
    }

  }


  return {};
});
