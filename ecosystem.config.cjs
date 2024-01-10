module.exports = {
  apps: [
    {
      name: 'shuimo-blog',
      exec_mode: 'fork',
      instances: '1',
      script: './.output/server/index.mjs',
      env_production: {
        PORT: "8513"
      }
    }
  ]
}
