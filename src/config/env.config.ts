
export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGO_BD,
    port: process.env.PORT || 3003,
    default_limit : parseInt(process.env.DEFAULT_LIMIT, 10) || 10
})