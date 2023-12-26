/**
 * @description
 * @author 阿怪
 * @date 2023/12/26 09:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useRafFn } from '~/compositions/base/useRafFn';
import type { Ref } from 'vue';


const interval = 1000 / 60;
const MAGIC_SPEED = 5;
type BooleanFn = () => boolean | undefined;
type Task = Partial<{ push: BooleanFn, revert: BooleanFn }>
export default function useAnimationFrame(speed?: {
  pushSpeed: number | undefined,
  revertSpeed: number | undefined
}) {
  const { pushSpeed=MAGIC_SPEED, revertSpeed=MAGIC_SPEED } = speed??{};

  let lastTime = performance.now();
  const speedRef = ref(MAGIC_SPEED);
  const taskInfo: Ref<Task> = ref({});
  let currentTask: {
    type: 'push' | 'revert',
    fn: BooleanFn
  } | undefined = undefined;

  const runTask = () => {
    if (taskInfo.value.revert) {
      currentTask = { type: 'revert', fn: taskInfo.value.revert };
      speedRef.value = revertSpeed??MAGIC_SPEED;
      taskInfo.value.revert = undefined;
    }
    if (currentTask) {
      const res = currentTask.fn();
      if (!res) {
        currentTask = undefined;
      }
    } else {
      if (taskInfo.value.push) {
        currentTask = { type: 'push', fn: taskInfo.value.push };
        speedRef.value = pushSpeed??MAGIC_SPEED;
        taskInfo.value.push = undefined;
      }

      if (currentTask) {
        currentTask.fn();
      } else {
        controls.pause();
      }
    }
  };

  let count = 0;
  const frame = () => {
    const delta = performance.now() - lastTime;
    if (delta < interval) return;
    count++;
    if (count % speedRef.value === 0) {
      lastTime = performance.now();
      runTask();
    }
  };

  const controls = useRafFn(frame, { immediate: false });

  const stop = () => {
    controls.pause();
    currentTask = undefined;
  };

  return {
    controls,
    taskInfo,
    speedRef,
    stop
  };

}
