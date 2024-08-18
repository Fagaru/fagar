// ecosystem.config.js

module.exports = {
    apps: [
      {
        name: 'fagar',
        script: 'node_modules/.bin/next',
        args: 'dev',
        cwd: '/var/www/fagar', // Assurez-vous que ce chemin correspond au répertoire de votre application
        instances: 1, // Vous pouvez ajuster le nombre d'instances en fonction des besoins
        exec_mode: 'fork', // Utilisez 'cluster' pour une gestion de charge équilibrée
        watch: false, // Définissez sur true si vous souhaitez que pm2 redémarre votre application lors des changements de fichiers
        env: {
          NODE_ENV: 'development',
        },
      },
    ],
  };
  