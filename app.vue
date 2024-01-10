<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup type="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
    { name: 'author', content: 'higuaifan,你好怪凡,higuaifan@higuaifan.com' },
    { name: 'description', content: '阿怪的个人博客' },
    { name: 'keywords', content: '你好怪凡,blog,shuimo-ui,shuimo,shuimo style blog,水墨风,水墨组件' },
    { name: 'referrer', content: 'no-referrer' },
  ]
})
</script>
