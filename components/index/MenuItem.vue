<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/12/26 01:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

const props = defineProps<{ slogan: string }>();
const emits = defineEmits(['setSlogan', 'revertSlogan']);

const setSlogan = () => {
  emits('setSlogan', props.slogan);
};

const revertSlogan = () => {
  emits('revertSlogan');
};
</script>

<template>
  <div class="m-cursor-pointer"
       @mouseenter="setSlogan"
       @mouseleave="revertSlogan">
    {{slogan}}
  </div>
</template>

<style scoped>

</style>
