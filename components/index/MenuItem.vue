<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/12/26 01:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import useSloganStore from '~/stores/useSlogan.store';
import { menuConfig } from '~/config/menu.config';
import { useRoute } from 'vue-router';

const props = defineProps<{ name: keyof typeof menuConfig }>();
const emits = defineEmits(['click']);

const sloganStore = useSloganStore();
const { setSlogan, revertSlogan } = sloganStore;

const router = useRouter();
const route= useRoute();

const onClick = ()=>{
  const path = menuConfig[props.name].path;
  if(path){
    router.push(path);
    return;
  }
  emits('click');
}

const activeMenuItem = () => {
  const routeName = route.fullPath;

  if (routeName.replace(/\//g, '') === props.name ||
    (route.name === 'index' && props.name === 'home')) {
    return ['m-menu-item-active'];
  }
  if (routeName.split("/")[1] === props.name) {
    return ['m-menu-item__deep-active', 'm-menu-item__deep-hover'];
  }
  
  return ['m-menu-item-hover'];
};
</script>

<template>
  <div :class="['m-menu-item', 'm-cursor-pointer', ...activeMenuItem()]"
       @click="onClick"
       @mouseenter="setSlogan(name)"
       @mouseleave="revertSlogan">
    {{name}}
  </div>
</template>

<style scoped>

</style>
