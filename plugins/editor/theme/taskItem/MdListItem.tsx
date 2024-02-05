/**
 * @description
 * @author 阿怪
 * @date 2023/12/8 16:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, defineComponent } from 'vue';
import { useNodeViewContext } from '@prosemirror-adapter/vue';
import { MCheckbox } from 'shuimo-ui';
import MDLi from './li/MDLi';


export default defineComponent(() => {
  const { node, selected, contentRef, setAttrs } = useNodeViewContext();
  const attrs = computed(() => node.value.attrs);
  const checked = computed(() => attrs.value.checked);
  const isBullet = computed(() => attrs.value.listType === 'bullet');

  const updateChecked = (val: boolean) => {
    setAttrs({ checked: val });
  };
  return () => {
    return (
      <li class={['m-list-item', selected ? 'ProseMirror-selectednode' : '']}>
        <span class="m-list-item-span">
          {checked.value != null ? (
            <MCheckbox modelValue={checked.value} onChange={updateChecked}/>
          ) : isBullet.value ? (
            <MDLi/>
          ) : (
            attrs.value?.label
          )}
        </span>
        <div class="min-w-0" ref={contentRef}/>
      </li>
    );
  };

}, { name: 'MdListItem' });
