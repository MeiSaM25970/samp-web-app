module.exports = {
    apps: [{
        name: "samp",
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        interpreter: 'node',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        JWT_SECRET:"JWT_SECRET_Key",
FTP_HOST:"46.100.55.147",
FTP_PORT:7453,
FTP_BASE_PATH:"/Attachments",
FTP_USER:"ftpuser",
FTP_PASS:"Ftp@789654123",
FTP_SECURE:false,
PORT: 3000

      }
    }]
  }