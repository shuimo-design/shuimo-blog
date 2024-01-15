<script setup lang="ts">
/**
 * @description friend component
 * @author 阿怪
 * @date 2024/1/15 23:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
const props = defineProps<{
  friend: Friend
}>();

const toLink = () => {
  window.open(props.friend.link);
};

</script>

<template>

  <div class="friend m-cursor-pointer" @click="toLink">
    <m-avatar :img="friend.avatar"/>
    <span class="friend-name">{{friend.name}}</span>
  </div>


</template>

<style scoped>

.friend {
  display: flex;
  flex-direction: column;
  align-items: center;

  .m-avatar {
    --m-cursor-auto: var(--m-cursor-pointer);
    --m-avatar-size: 10rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  opacity: 0.6;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }

  .friend-name{
    font-size: 2rem;
    font-weight: bold;
  }
}

</style>
