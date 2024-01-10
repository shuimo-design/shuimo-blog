/**
 * @description
 * @author 阿怪
 * @date 2024/1/10 16:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

type BlogMenuType = {
  slogan?:string;
  path?:string;
}

export const menuConfig:Record<string,BlogMenuType> = {
  'home':{
    slogan:`“黄河之水天上来，奔流到海不复回。”`,
    path:'/'
  },
  'blog':{
    slogan:`“人生得意须尽欢，莫使金樽空对月。”`,
    path:'/blog'
  },
  'resume':{
    slogan:`“天生我材必有用，千金散尽还复来。”`,
    path:'/resume'
  },
  'shuimo':{
    slogan:`“虽然粗暴，但是很水墨风。”`,
  }
}
