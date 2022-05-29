export default {
  jwtConstants: {
    secret: process.env.JWT || 'd903hdwwdssj13u9dj1hd391yu2198e',
  },
  dbConstants: {
    type: 'postgres',
    host: 'kesavan.db.elephantsql.com',
    port: 3306,
    username: 'twuqgkrv',
    password: 'eH8t3MoKrBZWcUbYQql5yIWwftKFR3z5',
    database: 'twuqgkrv',
    entities: [],
    synchronize: true,
  },
};
