/**
 * @description slogan store
 * @author 阿怪
 * @date 2024/1/8 23:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


const baseSlogan = `“一个从小就梦想可以混吃等死，做超酷的事的人的网站。”`;
const blogSlogan = `“只有一个人才能把我和学习分开，她应该不是你。”`;
const resumeSlogan = `“大道三千，我只修顺心意。”`;
const shuimoSlogan = `“虽然粗暴，但是很水墨风。”`;

export const slogans = {
  home: baseSlogan,
  blog: blogSlogan,
  resume: resumeSlogan,
  shuimo: shuimoSlogan
};

export default defineStore('slogan', () => {

  const sloganRef = ref(`“一个从小就梦想可以混吃等死，做超酷的事的人的网站。”`);



  const setSlogan = (slogan: keyof typeof slogans) => {
    sloganRef.value = slogans[slogan];
  };


  const revertSlogan = () => {
    setSlogan('home');
  };


  return {
    sloganRef,
    setSlogan,
    revertSlogan
  }

});
