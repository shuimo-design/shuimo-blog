/**
 * @description
 * @author 阿怪
 * @date 2024/1/7 17:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { solarToLunar } from './LunarDay';
import { yearToJiaZi } from './JIaZi';
import { getTermsByYear } from './terms';
import { LiuShiJiaZi } from './constant';
import type { TermInfoType } from './constant';


const getMonthJiaZi = (terms: TermInfoType[], date: { y: number, m: number, d: number }) => {
  // 获取terms的单数index值
  const needPrev = () => {
    for (let i = 0; i < terms.length; i++) {
      if (i % 2 === 1) {
        continue;
      }
      const term = terms[i];
      if (term.m === date.m) {
        if (date.d < term.d) {
          return -1;
        } else {
          return 0;
        }
      }
    }
    return 0;
  };

  // 月份是五年一轮回，取甲子，已知2024年的1月6日小寒之后开始是甲子月
  // 即阳历2023年12月可近似取为甲子月
  // 往前推120年，即1903年12月是甲子月，
  // 便于计算的话从1904第一个月是乙丑月开始。所以这里的算法将是year不要小于1904。。偷懒了
  const startYear = 1904;
  const index = (date.y - startYear) % 5 * 12 + date.m + needPrev();
  return LiuShiJiaZi[index % 60];
};

const getDayJiaZi = (date: { y: number, m: number, d: number }) => {
  // 日是六十天一轮回，已知2024年4月30日是甲子日
  // 那么根据给定日期和甲子日的差值，就可以得到日的干支

  const startDate = new Date('2024-4-30 00:00:00');
  const endDate = new Date(`${date.y}-${date.m}-${date.d} 00:00:00`);
  const diff = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24;
  let index = diff % 60;
  if (index < 0) {
    index = 60 + index;
  }
  return LiuShiJiaZi[index];
};

export const lunar = (date: { y: number, m: number, d: number }) => {

  const lunarDate = solarToLunar({ year: date.y, month: date.m, day: date.d });
  const lunarYear = yearToJiaZi(lunarDate.year);

  // console.log(lunarDay);
  // console.log(lunarYear);

  const terms = getTermsByYear(date.y);
  let term: undefined | string;

  terms.forEach(t => {
    if (t.m === date.m && t.d === date.d) {
      term = t.term;
    }
  });


  const lunarMonth = getMonthJiaZi(terms, date);
  const lunarDay = getDayJiaZi(date);

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    term
  };

};
