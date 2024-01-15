/**
 * @description  some mock data!! you should add your own logic!
 * @author 阿怪
 * @date 2024/1/12 18:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export const blogs: { data: Blog[] } = {
  data: [
    {
      id: 1,
      title: '中文效果',
      type: 'Blog',
      description: '事实上匹配合适的字体，中文效果将会非常不错。',
      cover: null,
      createTime: '2024-01-11T18:04:22.000Z',
      modifyTime: '2024-01-11T18:04:22.000Z'
    },
    {
      id: 2,
      title: 'Star us on GitHub!',
      type: 'Blog',
      description: 'If you like this project, please give us a star on GitHub!',
      cover: null,
      createTime: '2023-05-22T10:30:45.000Z',
      modifyTime: '2023-05-22T10:30:45.000Z',
    },
    {
      id: 3,
      title: 'We used Nuxt3 to build!',
      type: 'Nuxt3',
      description: 'Hello World',
      cover: null,
      createTime: '2023-01-14T19:20:12.000Z',
      modifyTime: '2023-01-14T19:20:12.000Z'
    },
    {
      id: 4,
      title: 'You can add any css plugins to build!',
      type: 'CSS',
      description: '...',
      cover: null,
      createTime: '2020-06-17T16:34:14.000Z',
      modifyTime: '2022-11-24T02:35:09.000Z'
    },
    {
      id: 5,
      title: 'Components used Shuimo-UI',
      type: 'Shuimo',
      description: 'We used shuimo-ui to build!',
      cover: null,
      createTime: '2019-09-26T02:40:37.000Z',
      modifyTime: '2022-11-24T02:35:10.000Z'
    }
  ]
};

export const types: BlogType[] = [
  { id: 1, name: 'Blog', level: 1, parentTypeId: 1, color: '#42b983' },
  { id: 2, name: 'Nuxt3', level: 1, parentTypeId: 1, color: '#2c3e50' },
  { id: 3, name: 'CSS', level: 1, parentTypeId: 1, color: '#dba62a' },
  { id: 4, name: 'Shuimo', level: 1, parentTypeId: 1, color: '#861717' }
]

