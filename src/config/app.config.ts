export default () => ({
  port: parseInt(process.env.PORT as string, 10),
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10),
  },
});
