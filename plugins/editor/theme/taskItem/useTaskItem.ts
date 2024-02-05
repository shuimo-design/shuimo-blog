/**
 * @description
 * @author 阿怪
 * @date 2023/11/30 16:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Editor } from '@milkdown/core';
import { useNodeViewFactory } from '@prosemirror-adapter/vue';
import { $view } from '@milkdown/utils';
import { listItemSchema } from '@milkdown/preset-commonmark';
import MdListItem from './MdListItem';


export default function useTaskItem(editor: Editor) {
  const nodeViewFactory = useNodeViewFactory();
  editor
    .use($view(listItemSchema.node, () => nodeViewFactory({
      component: MdListItem as any // todo fix type error
    })));


  return editor;
}
