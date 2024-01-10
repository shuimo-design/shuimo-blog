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

const props = defineProps<{ name: keyof typeof menuConfig }>();
const emits = defineEmits(['click']);

const sloganStore = useSloganStore();
const { setSlogan, revertSlogan } = sloganStore;

const router = useRouter();
const onClick = ()=>{
  const path = menuConfig[props.name].path;
  if(path){
    router.push(path);
    return;
  }
  emits('click');
}

</script>

<template>
  <div class="m-menu-item m-cursor-pointer"
       @click="onClick"
       @mouseenter="setSlogan(name)"
       @mouseleave="revertSlogan">
    {{name}}
  </div>
</template>

<style scoped>

</style>
