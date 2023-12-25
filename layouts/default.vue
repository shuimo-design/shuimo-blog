<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/12/25 10:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MBg from '~/components/base/background/MBg.vue';
</script>

<template>
  <MBg>
    <div class="m-header">
      <div>
        <slot name="header"></slot>
      </div>
      <m-dark-mode class="default-layout-dark-mode"/>
    </div>
    <slot></slot>
  </MBg>
</template>

<style scoped>

.m-header{
  display: flex;
  justify-content: space-between;
  margin: 0.4rem 0.8rem;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
}

.default-layout-dark-mode{
  animation: rotate 30s linear infinite;
}

</style>
