/**
 * @description Editor component
 * @author 阿怪
 * @date 2023/11/28 17:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { ComponentObjectPropsOptions } from 'vue';
import { defineComponent } from 'vue';
import { Milkdown } from '@milkdown/vue';
import useMEditor from './compositions/useMEditor';

const props: ComponentObjectPropsOptions<MEditorPropsType> | undefined = {
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  prism: { type: Boolean, default: true }
};


const EditorCore = defineComponent((props, ctx) => {
  const { updateValue } = useMEditor({ props, ctx });

  return () => {
    updateValue();
    return <Milkdown class="m-md-editor"/>;
  };
}, {
  name: 'EditorCore',
  props,
  emits: ['update:modelValue']
});


export default defineComponent((props, { emit }) => {
    return () => (
      <EditorCore {...props}
                  onUpdate:modelValue={(value: String) => emit('update:modelValue', value)}/>
    );
  },
  {
    name: 'Editor',
    props,
    emits: ['update:modelValue']
  });
