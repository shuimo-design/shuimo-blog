<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/12/25 17:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import Slogan from '~/components/index/Slogan';
import slogan from '~/components/index/Slogan';
import MenuItem from '~/components/index/MenuItem.vue';

const sloganRef = ref(`“一个从小就梦想可以混吃等死，做超酷的事的人的网站。”`);
const baseSlogan = `“一个从小就梦想可以混吃等死，做超酷的事的人的网站。”`;
const blogSlogan = `“只有一个人才能把我和学习分开，她应该不是你。”`;
const resumeSlogan = `“大道三千，我只修顺心意。”`;
const shuimoSlogan = `“虽然粗暴，但是很水墨风。”`;

const slogans = {
  base: baseSlogan,
  blog: blogSlogan,
  resume: resumeSlogan,
  shuimo: shuimoSlogan
};

const setSlogan = (slogan: keyof typeof slogans) => {
  sloganRef.value = slogans[slogan];
};

const revertSlogan = () => {
  setSlogan('base');
};


const router = useRouter();
const toBlog = ()=>{
  router.push('/blog');
};

</script>

<template>

  <div class="main flex">
    <div class="left">

      <MenuItem slogan="blog" @setSlogan="setSlogan" @revertSlogan="revertSlogan" @click="toBlog"/>
      <MenuItem slogan="resume" @setSlogan="setSlogan" @revertSlogan="revertSlogan"/>
      <MenuItem slogan="shuimo" @setSlogan="setSlogan" @revertSlogan="revertSlogan"/>

    </div>
    <div class="right">
      <ClientOnly>
        <Slogan :slogan="sloganRef"/>
      </ClientOnly>
    </div>
  </div>

</template>

<style scoped>

.main {
  justify-content: space-between;
  padding: 0 5rem;

  .left {
    font-size: 2.4rem;


    .m-cursor-pointer:hover {
      color: var(--m-color-main);
    }
  }


  .right {

  }

}

</style>
