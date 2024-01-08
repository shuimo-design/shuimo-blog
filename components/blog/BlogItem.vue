<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/12/28 00:45
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
const props = defineProps<{
  blog: Blog
}>();


const colorTypeMapRef = inject<Ref<Map<string, string>>>('colorTypeMapRef')!;

const getColor = (type: string) => {
  return colorTypeMapRef.value.get(type) ?? '#861717';
};

const openBlogDetails = () => {
  window.open(`/blog/${props.blog.title}`);
};

</script>

<template>
  <div class="blog-item" @click="openBlogDetails">
    <m-li :style="`--m-marker-active-inner-color:${getColor(blog.type)}`" active/>
    <div class="info m-cursor-pointer">
      <div class="title">{{ blog.title }}</div>
      <BlogDate class="date" :date="blog.createTime"/>
      <div class="description">
        {{ blog.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>

.blog-item {
  display: flex;
  flex-direction: column;
  height: var(--blog-h);
  align-items: flex-start;
  /*font-family: sans-serif;*/
  position: relative;
  z-index: 1;

  &:hover {

    color: var(--m-active-text-color);

    .description {
      opacity: 1;
      max-width: 30rem;
    }
  }
}

.cover {
  max-width: 6.4rem;

  img {
    max-width: 6.4rem;
    object-fit: contain;
  }
}

.info {
  margin: 0 1rem;
  writing-mode: vertical-lr;
}

.title {
  font-size: 1.8rem;
  margin-right: 0.5rem;
}

.date {
  font-size: 1.2rem;
}

.description {
  display: -webkit-box;
  --m-avatar-size: 50px;
  margin-left: 0.3rem;
  height: calc(var(--blog-h) - var(--m-avatar-size) - 1rem);
  word-break: break-all;
  color: var(--m-color-text-disabled);
  opacity: 0;
  max-width: 0;
  overflow-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  transition: opacity 0.6s, max-width 1s;
  letter-spacing: 0.1rem;
}

</style>
