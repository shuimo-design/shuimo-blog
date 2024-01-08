<script setup lang="ts">
/**
 * @description blog date
 * @author 阿怪
 * @date 2024/1/7 20:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { lunar } from '~/plugins/lunar/lunar';

const props = defineProps<{
  date: string
}>();


const lunarDate = computed(() => {
  const [yStr, mStr, last] = props.date.split('-');
  const [dStr, _] = last.split('T');
  return lunar({ y: Number(yStr), m: Number(mStr), d: Number(dStr) });
});

// 亥子属水，寅卯属木，巳午属火，申酉属金，辰戌丑未属土。

const DiZhiColor: Record<string, string> = {
  '子': 'var(--m-color-blue)',
  '丑': 'var(--m-color-warn)',
  '寅': 'var(--m-color-green)',
  '卯': 'var(--m-color-green)',
  '辰': 'var(--m-color-warn)',
  '巳': 'var(--m-color-main)',
  '午': 'var(--m-color-main)',
  '未': 'var(--m-color-warn)',
  '申': 'var(--m-color-orange)',
  '酉': 'var(--m-color-orange)',
  '戌': 'var(--m-color-warn)',
  '亥': 'var(--m-color-blue)'
};

/**
 * 甲木、乙木、丙火、丁火、戊土、己土、庚金、辛金、壬水、癸水，
 * 甲丙戊庚壬为阳性，
 * 乙丁己辛癸为阴性。
 */
const TianGanColor: Record<string, string> = {
  '甲': 'var(--m-color-green)',
  '乙': 'var(--m-color-green)',
  '丙': 'var(--m-color-main)',
  '丁': 'var(--m-color-main)',
  '戊': 'var(--m-color-warn)',
  '己': 'var(--m-color-warn)',
  '庚': 'var(--m-color-orange)',
  '辛': 'var(--m-color-orange)',
  '壬': 'var(--m-color-blue)',
  '癸': 'var(--m-color-blue)'
};

const getColor = (str: string) => {
  const [tian, di] = str.split('');
  return {
    '--m-blog-date-from': TianGanColor[tian],
    '--m-blog-date-to': DiZhiColor[di]
  };
};


</script>

<template>

  <p class="blog-date">
    <span class="blog-date-month" :style="getColor(lunarDate.month)">
      {{ lunarDate.month }}月
    </span>
    <span class="blog-date-day" :style="getColor(lunarDate.day)">
      {{ lunarDate.day }}日
    </span>
    <span>
      {{ lunarDate.term ?? '' }}
    </span>
  </p>

</template>

<style scoped>

.blog-date {
  color: white;
}

.blog-date span {
  display: inline-block;
  margin-bottom: 1rem;
}

.blog-date-month, .blog-date-day {
  --m-blog-date-from: var(--m-color-main);
  --m-blog-date-to: var(--m-color-warn);
  mask-image: url(/img/seal.png); /* this image no copyright..need update */
  mask-size: 100% 100%;
  background: linear-gradient(to bottom, var(--m-blog-date-from), var(--m-blog-date-to));
  padding: 0.8rem;
  border-radius: 0.4rem;
}

</style>
