/**
 * @description editor listener hook
 * @author 阿怪
 * @date 2023/11/29 17:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { type Ref } from 'vue';
import { Editor } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';


export const useListener = (
  editor: Editor,
  valueRef: Ref<string>,
  emit: (event: 'update:modelValue', ...args: any[]) => void
) => {
  return editor.config(ctx => {
    ctx.get(listenerCtx).markdownUpdated((_Ctx, markdown) => {
      markdown = markdown.replace(/\n$/, '');
      if (markdown === valueRef.value) return;
      valueRef.value = markdown;
      emit('update:modelValue', markdown);
    });
  }).use(listener);
};
