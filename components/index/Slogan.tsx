/**
 * @description home slogan component
 * @author 阿怪
 * @date 2023/12/25 17:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * will split by code "，"
 */
import { defineComponent } from 'vue';
import useSloganTask from '~/compositions/index/useSloganTask';

export default defineComponent((props) => {

  const {
    sloganRef,
    sloganSecondRef,
    init,
    clearTimer,
    secondSloganMarginTopRef
  } = useSloganTask();

  watch(() => props.slogan, (newVal) => {
    init(newVal);
  });


  onMounted(() => {
    init(props.slogan);
  });

  onBeforeUnmount(() => {
    clearTimer();
  });


  return () => {

    return (
      <div class="slogan">
        <span>{sloganRef.value}</span>
        <br/>
        <span class="slogan-second"
              style={{ marginTop: secondSloganMarginTopRef.value }}>{sloganSecondRef.value}</span>
      </div>
    );
  };
}, {
  name: 'Slogan',
  props: {
    slogan: { type: String }
  }
});
