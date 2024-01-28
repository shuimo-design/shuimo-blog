<template>
  <Title>{{headConfig.title}}</Title>
  <div class="shuimo-blog">
    <NuxtLayout>
      <BaseHeader/>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { headConfig } from '~/config/head.config';

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
    { name: 'author', content: headConfig.author },
    { name: 'description', content: headConfig.description },
    { name: 'keywords', content: headConfig.keywords },
    { name: 'referrer', content: 'no-referrer' }
  ]
});
</script>

