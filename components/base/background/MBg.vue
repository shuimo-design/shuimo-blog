<script setup lang="ts">
/**
 * @description 水墨风的背景组件
 * @author 阿怪
 * @date 2023/12/25 10:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 这个组件将会抽离出去，所以元素都将放在一个这个文件夹中
 * 另外试一下手动收集css..似乎有些难受
 */
import { onMounted } from 'vue';


const mLeft = ref<HTMLElement>();
const mRight = ref<HTMLElement>();
const mLeftReflect = ref<HTMLElement>();
const mRightReflect = ref<HTMLElement>();
const moveMountain = (e: MouseEvent) => {
  const x = e.clientX;
  const y = e.clientY;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const xPercent = x / w;
  const yPercent = y / h;
  const xMove = xPercent * 10 - 5;
  const yMove = yPercent * 10 - 5;
  const leftRatio = xMove < 0 ? 1 : 2;
  const rightRatio = xMove > 0 ? 1 : 2;

  if (!mLeft.value || !mRight.value || !mLeftReflect.value || !mRightReflect.value) {
    return;
  }

  let ratio = 1;
  mLeft.value.style.cssText = `transform: translate(${xMove * leftRatio * ratio}px, ${yMove * ratio}px)`;
  mRight.value.style.cssText = `transform: translate(${xMove * rightRatio * ratio}px, ${yMove * ratio}px)`;
  ratio = 2;
  mLeftReflect.value.style.cssText = `transform: translate(${xMove * leftRatio * ratio}px, ${yMove * ratio}px)`;
  mRightReflect.value.style.cssText = `transform: translate(${xMove * rightRatio * ratio}px, ${yMove * ratio}px)`;
};

onMounted(() => {
  window.addEventListener('mousemove', moveMountain);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveMountain);
});


</script>

<template>
  <div class="m-bg w-100 h-100">
    <div class="mountains w-100 absolute">
      <div class="flex between-end">
        <div class="m-mountain-left mountain-left bg-100" ref="mLeft"/>
        <div class="m-mountain-right mountain-right bg-100" ref="mRight"/>
      </div>
      <div class="flex between-start">
        <div class="m-mountain-left-reflection mountain-left bg-100" ref="mLeftReflect"/>
        <div class="m-mountain-right-reflection mountain-right bg-100" ref="mRightReflect"/>
      </div>
    </div>
    <div class="rice-paper-hover w-100 h-100 absolute t0r0"/>
    <div class="m-bg-layout absolute t0r0 w-100 h-100">
      <slot></slot>
    </div>


  </div>
</template>

<style scoped>


</style>
