module.exports = {
  apps: [
    {
      name: 'zionary-prime-launch',
      script: 'npm',
      args: 'run dev',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      // Configuración para detección de fallos de memoria
      node_args: '--max-old-space-size=1024',
      // Callback personalizado para reinicios
      post_update: [
        "npm install",
        "npm run build"
      ]
    }
  ],

  deploy: {
    production: {
      user: 'NODE_USER',
      host: 'SERVER_IP',
      ref: 'origin/main',
      repo: 'GIT_REPOSITORY',
      path: '/var/www/zionary-prime-launch',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.cjs --env production',
      'pre-setup': ''
    }
  }
};