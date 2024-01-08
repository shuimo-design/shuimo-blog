<script setup lang="ts">
/**
 * @description blog details
 * @author 阿怪
 * @date 2024/1/8 22:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

definePageMeta({
  layout: 'blog'
});

const route = useRoute();

const title = route.params.title;

const { data: blogDetailsRef } = useFetch<BlogDetailType>(`/api/blog/${title}`);


</script>

<template>
  <div class="blog-detail m-scroll" v-if="blogDetailsRef">
    <div class="blog-detail-title">{{ blogDetailsRef.title }}</div>
    <m-divider/>

    <div class="blog-detail-content" v-html="blogDetailsRef.bodyHtml">

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
}

.blog-detail-content {
  font-family: sans-serif;
}

</style>
