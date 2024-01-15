/**
 * @description
 * @author 阿怪
 * @date 2023/12/26 14:48
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

type Fn = () => void;

type Blog = {
  id: number;
  title: string;
  cover: string | null;
  createTime: string;
  modifyTime: string;
  description: string;
  type: string;
}

type BlogType = {
  id: number;
  name: string;
  level: number;
  parentTypeId: number;
  color: string;
}

type BlogTypeVO = BlogType & {
  isActive: boolean;
}

type BlogDetailType = {
  id: number;
  title: string;
  bodyHtml: string;
  type: number;
  description: string;
  cover: string;
  articleId: string;
  bookId: string;
  createTime: string;
  modifyTime: string;
}
