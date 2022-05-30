import { join } from 'path';

export default {
  jwtConstants: {
    secret: process.env.JWT || 'd903hdwwdssj13u9dj1hd391yu2198e',
  },
  dbConstants: {
    ...JSON.parse(process.env.DB),
    entities: [join(__dirname, '**', '*.schema.{ts,js}')],
  } || {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '66215901',
    database: 'gorila',
    entities: [join(__dirname, '**', '*.schema.{ts,js}')],
    synchronize: true,
  },
};
