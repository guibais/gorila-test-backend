export default {
  jwtConstants: {
    secret: process.env.JWT || 'd903hdwwdssj13u9dj1hd391yu2198e',
  },
  dbConstants: {
    type: (process.env.DBTYPE as any) || 'mysql',
    host: process.env.DBHOST || 'localhost',
    port: (process.env.DBPORT as any) || 3306,
    username: process.env.DBUSER || 'root',
    password: process.env.DBPASSWORD || '66215901',
    database: process.env.DBNAME || 'gorila',
    synchronize: true,
  },
};
