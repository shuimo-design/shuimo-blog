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
import Header from '~/components/base/Header.vue';
</script>

<template>
  <MBg>
    <Header>
      <slot/>
    </Header>
  </MBg>
</template>

<style scoped>

</style>
