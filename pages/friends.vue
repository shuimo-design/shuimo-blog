<script setup lang="ts">
/**
 * @description friends page
 * @author 阿怪
 * @date 2024/1/15 23:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { friendsConfig } from '~/config/friends.config';
import Friend from '~/components/friends/Friend.vue';


const friends = computed(() => {
  return friendsConfig.map(f => {
    return {
      ...f,
      top: Math.random() * 10
    };
  });
});

</script>

<template>

  <div class="friends">
    <Friend v-for="f in friends" :friend="f"/>
  </div>

</template>

<style scoped>

.friends {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>
