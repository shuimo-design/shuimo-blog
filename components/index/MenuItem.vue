<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/12/26 01:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import useSloganStore, { slogans } from '~/stores/useSlogan.store';

const props = defineProps<{ slogan: keyof typeof slogans }>();

const sloganStore = useSloganStore();
const { setSlogan, revertSlogan } = sloganStore;

</script>

<template>
  <div class="m-menu-item m-cursor-pointer"
       @mouseenter="setSlogan(slogan)"
       @mouseleave="revertSlogan">
    {{slogan}}
  </div>
</template>

<style scoped>

</style>
