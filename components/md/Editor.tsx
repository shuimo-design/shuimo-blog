/**
 * @description Editor
 * @author 阿怪
 * @date 2023/12/13 10:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo May be planned to be packaged into a plugin.
 */
import { defineComponent, ref, watch } from 'vue';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue';
import { MilkdownProvider } from '@milkdown/vue';
import Editor from '../../plugins/editor/Editor';


export default defineComponent((props, { emit }) => {

  const infoRef = ref(props.modelValue);
  watch(() => props.modelValue, (val) => {
    infoRef.value = val;
  });

  return () => {
    return <ProsemirrorAdapterProvider>
      <MilkdownProvider>
        <Editor
          readonly={props.readonly}
          modelValue={infoRef.value}
          onUpdate:modelValue={val => {
            infoRef.value = val;
            emit('update:modelValue', val);
          }}/>
      </MilkdownProvider>
    </ProsemirrorAdapterProvider>;
  };
}, {
  name: 'Editor',
  props: {
    modelValue: { type: String },
    readonly: { type: Boolean, default: false }
  },
  emits: ['update:modelValue']
});
