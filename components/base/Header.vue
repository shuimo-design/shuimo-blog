<script setup lang="ts">
/**
 * @description common header component
 * @author 阿怪
 * @date 2024/1/8 23:15
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MenuItem from '~/components/index/MenuItem.vue';

const router = useRouter();

const toHome = () => {router.push('/');};
const toBlog = () => {router.push('/blog');};
const toResume = () => {router.push('/resume');};
const toShuimo = () => {window.open('https://shuimo.design');};

</script>

<template>
  <div class="m-header">
    <MenuItem slogan="home" @click="toHome"/>
    <MenuItem slogan="blog" @click="toBlog"/>
    <MenuItem slogan="resume" @click="toResume"/>
    <div class="m-header-end">
      <MenuItem slogan="shuimo" @click="toShuimo"/>
      <m-dark-mode class="default-layout-dark-mode"/>
    </div>
  </div>
  <slot/>
</template>

<style scoped>

</style>
