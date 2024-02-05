/**
 * @description shuimo li component
 *              webkit not support ::marker
 * @author 阿怪
 * @date 2023/12/20 09:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';


export default defineComponent<{ active?: boolean }>((props) => {
  return () => (
    <div class={['m-d-li', { 'm-d-li-active': props.active }]}>
      <div class="m-d-icon"></div>
      <slot></slot>
    </div>
  );
}, {
  name: 'MDLi',
  props: {
    active: { type: Boolean, default: false }
  }
});
