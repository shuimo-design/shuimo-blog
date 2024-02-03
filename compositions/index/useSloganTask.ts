/**
 * @description slogan task hook
 * @author 阿怪
 * @date 2023/12/25 22:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * init trigger slogan pushing,
 * every pushing task will push 1 char to sloganRef or sloganSecondRef,
 * depends on the task[0] and task[1].
 * task list from taskQueue.
 * when pushing char , will check the taskQueue,
 * if taskQueue is not empty, will stop pushing.
 * run cleanSloganTask to clear taskQueue.
 *
 */
import useAnimationFrame from '~/compositions/index/useAnimationFrame';

const PUSH_SPEED = 3;
const REVERT_SPEED = 1;

type Task = [string, string];
export default function useSloganTask() {

  let lastTask: Task | null = null;
  let currentTask: Task = ['', ''];

  const sloganRef = ref('');
  const sloganSecondRef = ref('');


  const {
    taskInfo,
    controls,
    stop
  } = useAnimationFrame({
    pushSpeed: PUSH_SPEED,
    revertSpeed: REVERT_SPEED
  });


  /**
   * default font size: 1.8rem
   * @see .slogan in index.css
   * */
  const BASE_MARGIN_TOP = '0rem';
  const secondSloganMarginTopRef = ref(BASE_MARGIN_TOP);
  let waitChangeMarginTop = BASE_MARGIN_TOP;
  const setSecondSloganMarginTop = (sloganLength: number, secondLength: number) => {
    const sloganFontSize = 3;
    const half = sloganLength / 2;
    let radio = half;
    if (half >= secondLength) {
      radio = secondLength / 2 + half;
    }
    waitChangeMarginTop = `${radio * sloganFontSize}rem`;
  };

  const getSloganTask = (slogan: string) => {
    const sloganList = slogan.split('，');
    if (sloganList.length < 2) {
      console.warn('slogan must be split by "，"');
      sloganList.push(' ');
    } else if (sloganList.length > 2) {
      console.warn('slogan must be split by only one "，"');
      sloganList.length = 2;
    }
    sloganList[0] += '，';
    return sloganList as Task;
  };

  const init = (slogan: string) => {
    callRevert();
    lastTask = getSloganTask(slogan);
    startTask();
  };

  const startTask = () => {
    if (lastTask === null) return;

    currentTask = lastTask;
    lastTask = null;
    setSecondSloganMarginTop(currentTask[0].length, currentTask[1].length);
    callRun();
  };

  const clearTimer = () => {
    stop();
  };
  const runTask = () => {
    if (lastTask !== null) {
      clearTimer();
      taskInfo.value.revert = revertTask;
      controls.resume();
      return;
    }
    if (currentTask[0].length > 0) {
      sloganRef.value += currentTask[0][0];
      currentTask[0] = currentTask[0].slice(1);
    } else if (currentTask[1].length > 0) {
      if (waitChangeMarginTop !== secondSloganMarginTopRef.value) {
        secondSloganMarginTopRef.value = waitChangeMarginTop;
      }
      sloganSecondRef.value += currentTask[1][0];
      currentTask[1] = currentTask[1].slice(1);
    } else {
      clearTimer();
      return;
    }
    return true;
  };

  const revertTask = () => {
    if (sloganSecondRef.value.length > 0) {
      sloganSecondRef.value = sloganSecondRef.value.slice(0, -1);
    } else if (sloganRef.value.length > 0) {
      sloganRef.value = sloganRef.value.slice(0, -1);
    }

    if (sloganRef.value.length === 0 && sloganSecondRef.value.length === 0) {
      startTask();
      return;
    }
    return true;
  };


  const callRun = () => {
    taskInfo.value.push = runTask;
    controls.resume();
  };
  const callRevert = () => {
    taskInfo.value.revert = revertTask;
    controls.resume();
  };

  return {
    sloganRef,
    sloganSecondRef,
    secondSloganMarginTopRef,
    init,
    clearTimer
  };
}
