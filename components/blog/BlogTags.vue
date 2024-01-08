<script setup lang="ts">
/**
 * @description 博客类型
 * @author 阿怪
 * @date 2024/1/2 21:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import useTypesStore from '~/stores/useTypes.store';
import { storeToRefs } from '#imports';

const typesStore = useTypesStore();
await callOnce(typesStore.fetchTypes);
const { typesRef } = storeToRefs(typesStore);

</script>

<template>

  <div class="blog-types">
    <m-tag class="tag"
           @click="typesStore.onActiveType(typeItem)"
           v-for="typeItem in typesRef" :style="typesStore.getStyle(typeItem)">
      <span>{{ typeItem.name }}</span>
    </m-tag>
  </div>


</template>

<style scoped>

.blog-types {
  margin-bottom: 1rem;
  --m-cursor-auto: var(--m-cursor-pointer); /* why?? */
}

.tag {
  margin: 0 0.8rem;
  --m-tag-h: 2rem;
}

</style>
