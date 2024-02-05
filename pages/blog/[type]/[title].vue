<script setup lang="ts">
/**
 * @description blog details
 * @author 阿怪
 * @date 2024/1/8 22:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { headConfig } from '~/config/head.config';
import Editor from '~/components/md/Editor';

definePageMeta({
  layout: 'without-mountain'
});

const route = useRoute();

const title = route.params.title;

const { data: blogDetailsRef } = useFetch<BlogDetailType>(`/api/blog/${title}`);

useHead({
  title: `${headConfig.title}${blogDetailsRef.value?.title ? `-${blogDetailsRef.value.title}` : ''}`,
  meta: [
    { name: 'description', content: blogDetailsRef.value?.description ?? '' },
    {
      name: 'keywords',
      content: `${blogDetailsRef.value?.title ? `${blogDetailsRef.value?.title},` : ''}${headConfig.keywords}`
    }
  ]
});

</script>

<template>
  <div class="blog-detail m-scroll" v-if="blogDetailsRef">
    <div class="blog-detail-title">{{ blogDetailsRef.title }}</div>
    <m-divider/>

    <ClientOnly>
      <Editor readonly v-model="blogDetailsRef.content"/>
    </ClientOnly>

  </div>
</template>

<style scoped>

.blog-detail {
  height: var(--m-main-h);
  overflow-y: auto;
  padding: 0 2rem;
}

.blog-detail-title {
  font-size: 4rem;
  margin: 1rem 0;
}

.blog-detail-content {
  font-family: sans-serif;
  margin-bottom: 2rem;
}

</style>
