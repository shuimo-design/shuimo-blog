/**
 * @description shuimo divider plugin hook
 * @author 阿怪
 * @date 2023/12/11 15:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Editor } from '@milkdown/core';
import { useNodeViewFactory } from '@prosemirror-adapter/vue';
import { $view } from '@milkdown/utils';
import { hrSchema } from '@milkdown/preset-commonmark';
import MdDivider from './MdDivider';


export default function useDivider(editor: Editor) {
  const nodeViewFactory = useNodeViewFactory();
  editor
    .use($view(hrSchema.node, () => nodeViewFactory({
      component: MdDivider as any
    })));

  return editor;
}
