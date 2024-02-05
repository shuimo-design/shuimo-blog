/**
 * @description
 * @author 阿怪
 * @date 2023/12/11 17:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Editor } from '@milkdown/core';
import { milkShiki } from './shiki.ts';


export default function useShiki(editor:Editor){
  editor.use(milkShiki);
  return editor;
}
