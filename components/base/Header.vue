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
import useSloganStore from '~/stores/useSlogan.store';

const sloganStore = useSloganStore();

const router = useRouter();
const toBlog = () => {router.push('/blog');};

const { setSlogan, revertSlogan } = sloganStore;

const toHome = () => {router.push('/');};

const toShuimo = () => {window.open('https://shuimo.design');};

</script>

<template>
  <div class="m-header">
    <MenuItem slogan="home" @click="toHome"/>
    <MenuItem slogan="blog" @click="toBlog"/>
    <MenuItem slogan="resume"/>
    <div class="m-header-end">
      <MenuItem slogan="shuimo" @click="toShuimo"/>
      <m-dark-mode class="default-layout-dark-mode"/>
    </div>
  </div>
  <slot/>
</template>

<style scoped>

</style>
