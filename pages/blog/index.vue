<script setup lang="ts">
/**
 * @description shuimo blog page
 * @author 阿怪
 * @date 2023/12/27 11:24
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import useTypesStore from '~/stores/useTypes.store';
import { provide, storeToRefs } from '#imports';
import { getYearJiaZi } from '@shuimo-design/lunar';


const typesStore = useTypesStore();
await callOnce(typesStore.fetchTypes);
const { colorTypeMapRef, currentActiveTypeNameRef } = storeToRefs(typesStore);

const { data: blogsRef } = await useFetch<{
  years: number[],
  map: Record<number, Blog[]>
}>('/api/blog', {
  query: { type: currentActiveTypeNameRef }
});
provide('colorTypeMapRef', computed(() => colorTypeMapRef.value));


</script>

<template>
  <div>
    <BlogTags/>
    <div class="blogs-wrapper">
      <div class="blogs m-scroll" v-if="blogsRef">
        <div class="blog-year" v-for="year in blogsRef.years">
          <div class="blog-year-name">{{ getYearJiaZi(year) }}</div>
          <div class="blog-year-bg">
          </div>
          <BlogItem :blog="blog" v-for="blog in blogsRef.map[year]"/>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>

.blogs-wrapper {
  --blog-h: calc(100vh - 122px);
  height: var(--blog-h);
  display: flex;
  align-items: center;
}

.blogs {
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  overflow-x: auto;
  width: 100vw;
}

.blog-year {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0 6rem 0 2rem;
}

.blog-year-name {
  font-size: 20rem;
  position: absolute;
  writing-mode: vertical-lr;
  color: var(--year-color);
  background: linear-gradient(to right, var(--year-color) 0%, rgba(255, 255, 255, 0) 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 0;
}

.blog-year-bg {
  position: absolute;
  z-index: 0;
  background-size: 100% auto;
  margin-top: 18rem;
  height: calc(100% - 24rem);
  width: 12rem;
  opacity: 0.1;

  img {
    width: 12rem;
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);

  }

}

</style>
