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
import useSloganStore from '~/stores/useSlogan.store';

const sloganStore = useSloganStore();
const { sloganRef } = storeToRefs(sloganStore);

</script>

<template>
  <div>
    <div class="main">
      <div class="left">

      </div>
      <div class="right">
        <ClientOnly>
          <Slogan :slogan="sloganRef"/>
        </ClientOnly>
      </div>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<style scoped>

.main {
  display: flex;
  justify-content: space-between;
  padding: 0 5rem;
  height: calc(100vh - var(--m-header-h));

  .left {
    font-size: 2.4rem;
  }

}

.footer{
  position: absolute;
  bottom: 0;
  width: 100vw;
  text-align: center;
  height: 3.2rem;
  font-size: 1.6rem;
  line-height: 3.2rem;
  background: var(--footer-bg);
}

</style>
