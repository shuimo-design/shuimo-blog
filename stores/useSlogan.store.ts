/**
 * @description slogan store
 * @author 阿怪
 * @date 2024/1/8 23:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { menuConfig } from '~/config/menu.config';

export default defineStore('slogan', () => {

  const sloganRef = ref(menuConfig['home'].slogan);

  const setSlogan = (slogan: keyof typeof menuConfig) => {
    sloganRef.value = menuConfig[slogan].slogan;
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
