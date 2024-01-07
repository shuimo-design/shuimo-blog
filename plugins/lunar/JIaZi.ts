/**
 * @description 六十甲子
 * @author 阿怪
 * @date 2024/1/7 04:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { LiuShiJiaZi } from './constant';

export const yearToJiaZi = (year: number) => {
  const index = (year - 4) % 60;
  return LiuShiJiaZi[index];
}
