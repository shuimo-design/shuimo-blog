/**
 * @description shuimo editor creator hook
 * @author 阿怪
 * @date 2023/11/28 17:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';
import { useEditor } from '@milkdown/vue';
import { defaultValueCtx, Editor, editorViewCtx, editorViewOptionsCtx, rootCtx, serializerCtx } from '@milkdown/core';
import { commonmark, imageAttr } from '@milkdown/preset-commonmark';
import { replaceAll } from '@milkdown/utils';
import { gfm } from '@milkdown/preset-gfm';
import { useListener } from './plugins/useListener';
import useTaskItem from '../theme/taskItem/useTaskItem';
import useDivider from '../theme/divider/useDivider';
import useShiki from './plugins/shiki/useShiki';

export default function useMEditor(options: {
  props: MEditorPropsType,
  ctx: {
    emit: (event: 'update:modelValue', ...args: any[]) => void
  }
}) {
  const {
    props,
    ctx
  } = options;
  const {
    // prism,
    readonly = false
  } = props;
  const { emit } = ctx;
  const editorRef = ref();
  const editorCtxRef = ref();
  const valueRef = ref(props.modelValue ?? '');

  useEditor((root) => {
      let editor = Editor.make();
      let installListener = !readonly;


      editor = editor
        .config((ctx) => {
          editorCtxRef.value = ctx;

          ctx.set(imageAttr.key, (node) => {
            // 获取src的查询参数
            const src = node.attrs.src;
            const sqlList = src.split('&');
            const sqlMap: Record<string, string> = {};
            sqlList.forEach((item:any) => {
              const [key, value] = item.split('=');
              sqlMap[key] = value;
            });
            const { width } = sqlMap;

            const res: { [attr: string]: any; } = node.attrs;
            if (width) {
              res.width = width;
            }

            return res;
          });

          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, valueRef.value ?? '');
          if (readonly) {
            ctx.update(editorViewOptionsCtx, (prev) => ({
              ...prev,
              editable: () => !readonly
            }));
          }

        });
      editor = useShiki(editor);

      editor = editor
        .use(commonmark)
        .use(gfm);
      // if (prism) {
      //   editor = usePrism(editor);
      // }


      if (installListener) {
        editor = useListener(editor, valueRef, emit);
      }

      editor = useTaskItem(editor);
      editor = useDivider(editor);

      editorRef.value = editor;
      return editor;
    }
  );

  const getString = () => {
    if (!editorRef.value) return '';
    return editorRef.value.action((ctx: any /* import { Ctx } from '@milkdown/ctx'; */) => {
      const editorView = ctx.get(editorViewCtx);
      const serializer = ctx.get(serializerCtx);
      return serializer(editorView.state.doc);
    });
  };

  const updateValue = () => {
    /**
     * todo
     * 外部要是有个input之类的，在疯狂输入更新的时候，会来不及渲染和序列化，导致双向绑定数据会吞输入之类的情况，
     * 实际上上部的 markdown = markdown.replace(/\n$/, '') 也是临时方案
     */

    if (props.modelValue !== valueRef.value) {
      if (editorRef.value) {
        editorRef.value.action(replaceAll(props.modelValue ?? ''));
        valueRef.value = getString();
        // editorCtxRef.value.get(rootCtx)
      }
    }
  };

  return {
    editorCtxRef,
    updateValue
  };

}
