/**
 * @description copy from vueuse/useRafRn
 * @author 阿怪
 * @date 2023/12/26 14:45
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * @see https://github.com/vueuse/vueuse/blob/main/packages/core/useRafFn/index.ts
 */
import type { Ref } from 'vue';


interface UseRafFnCallbackArguments {
  delta: number;
  timestamp: DOMHighResTimeStamp;
}

interface ConfigurableWindow {window?: Window;}

interface UseRafFnOptions extends ConfigurableWindow {
  immediate?: boolean;
  fpsLimit?: number;
}

interface Pausable {
  isActive: Readonly<Ref<boolean>>;
  pause: Fn;
  resume: Fn;
}

const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';
const defaultWindow = /* #__PURE__ */ isClient ? window : undefined;

export function useRafFn(fn: (args: UseRafFnCallbackArguments) => void, options: UseRafFnOptions = {}): Pausable {
  const {
    immediate = true,
    fpsLimit = undefined,
    window = defaultWindow
  } = options;

  const isActive = ref(false);
  const intervalLimit = fpsLimit ? 1000 / fpsLimit : null;
  let previousFrameTimestamp = 0;
  let rafId: null | number = null;

  function loop(timestamp: DOMHighResTimeStamp) {
    if (!isActive.value || !window)
      return;

    const delta = timestamp - (previousFrameTimestamp || timestamp);

    if (intervalLimit && delta < intervalLimit) {
      rafId = window.requestAnimationFrame(loop);
      return;
    }

    fn({ delta, timestamp });

    previousFrameTimestamp = timestamp;
    rafId = window.requestAnimationFrame(loop);
  }

  function resume() {
    if (!isActive.value && window) {
      isActive.value = true;
      rafId = window.requestAnimationFrame(loop);
    }
  }

  function pause() {
    isActive.value = false;
    if (rafId != null && window) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  if (immediate)
    resume();

  tryOnScopeDispose(pause);

  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}


const tryOnScopeDispose = (fn: Fn) => {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
};
