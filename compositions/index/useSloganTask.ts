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
const PUSH_SPEED = 100;
const REVERT_SPEED = 33;

type Task = [string, string];
export default function useSloganTask() {
  let isRunning = false;
  let isReverting = false;

  let lastTask: Task | null = null;
  let currentTask: Task = ['', ''];

  const sloganRef = ref('');
  const sloganSecondRef = ref('');


  /**
   * default font size: 1.8rem
   * @see .slogan in index.css
   * */
  const secondSloganMarginTopRef = ref('0rem');
  const setSecondSloganMarginTop = (sloganLength: number, secondLength: number) => {
    const sloganFontSize = 1.8;
    const half = sloganLength / 2;
    let radio = half;
    if (half >= secondLength) {
      radio = secondLength / 2 + half;
    }
    secondSloganMarginTopRef.value = `${radio * sloganFontSize}rem`;
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
    revertTask();
    lastTask = getSloganTask(slogan);
    if (!isReverting) {
      startTask();
    }
  };

  const startTask = () => {
    if (lastTask === null) return;
    if (isRunning) return;
    if (isReverting) return;

    currentTask = lastTask;
    lastTask = null;
    isRunning = true;
    setSecondSloganMarginTop(currentTask[0].length, currentTask[1].length);
    runTask();
  };

  let taskTimer: number | undefined = undefined;
  const clearTimer = () => {
    clearTimeout(taskTimer);
  };

  const runTask = () => {
    if (lastTask !== null) {
      clearTimer();
      isRunning = false;
      isReverting = true;
      revertTask();
      return;
    }
    if (currentTask[0].length > 0) {
      sloganRef.value += currentTask[0][0];
      currentTask[0] = currentTask[0].slice(1);
    } else if (currentTask[1].length > 0) {
      sloganSecondRef.value += currentTask[1][0];
      currentTask[1] = currentTask[1].slice(1);
    } else {
      clearTimer();
      isRunning = false;
      return;
    }
    taskTimer = setTimeout(runTask, PUSH_SPEED) as any as number;
  };


  const revertTask = () => {
    if (isRunning) {
      return;
    }
    isReverting = true;
    if (sloganSecondRef.value.length > 0) {
      sloganSecondRef.value = sloganSecondRef.value.slice(0, -1);
    } else if (sloganRef.value.length > 0) {
      sloganRef.value = sloganRef.value.slice(0, -1);
    }

    if (sloganRef.value.length === 0 && sloganSecondRef.value.length === 0) {
      isReverting = false;
      startTask();
      return;
    }

    taskTimer = setTimeout(revertTask, REVERT_SPEED) as any as number;
  };

  return {
    sloganRef,
    sloganSecondRef,
    init,
    clearTimer,
    secondSloganMarginTopRef
  };
}
