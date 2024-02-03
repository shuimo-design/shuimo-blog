/**
 * @description janghood lint config
 * @author 阿怪
 * @date 2022/11/18 03:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export default {
  base: {
    include: [
      'pages/**/*',
      'components/**/*',
      'compositions/**/*',
      'modules/**/*',
      'layouts/**/*',
      'stores/**/*',
      'nuxt.config.ts',
    ],
  },
  lint: {
    eslint: {
      overwrite: {
        rules: {
          // todo lint support merge rules
          'vue/multi-word-component-names': 'off',
          'vue/valid-v-for': 'off',
          'vue/require-v-for-key': 'off',
        },
      },
    },
    commitlint: true,
  },
};
