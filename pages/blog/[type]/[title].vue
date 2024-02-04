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
    <m-divider />
    <div class="blog-detail-content">
      <div class="blog-detail-description" v-if="blogDetailsRef.description">
        {{ blogDetailsRef.description }}
      </div>
      <div class="blog-detail-content-text" v-html="blogDetailsRef.bodyHtml" />
    </div>
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
  text-align: center;
}

.blog-detail-content {
  font-family: sans-serif;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.blog-detail-description {
  margin: 10px 0;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(255, 255, 255, 0.5);
  width: 100%;
  max-width: 1024px;
  text-align: center;
}

.tag {
  margin: 0 0.8rem;
  --m-tag-h: 3.2rem;
  font-size: 1.8rem;
}

.blog-detail-content-text {
  width: 100%;
  max-width: 1024px;
}
</style>
