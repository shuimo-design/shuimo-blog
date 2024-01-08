<script setup lang="ts">
/**
 * @description blog layout
 * @author 阿怪
 * @date 2024/1/8 22:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MBg from '~/components/base/background/MBg.vue';
import Header from '~/components/base/Header.vue';
</script>

<template>
  <MBg hide-mountain>
    <Header>
      <slot/>
    </Header>
  </MBg>
</template>

<style scoped>

</style>
