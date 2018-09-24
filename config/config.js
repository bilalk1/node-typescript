var config = {
    development: {
        credentials: {
            adminUser: 'admin@getwomb.com',
            password: '1234',
            email : 'admin@getwomb.com'
        },
        ip: '127.0.0.1',
        node_port: 3000,
        db: {
            host: 'mongodb://localhost:27017/pk_flayers',
        },
        AUTH_TIMEOUT: {
            user: 1800,
            admin: 3600,
            provider: 3600
        },
        // JWT_SECRETS: {
        //     TOKEN: secret_data.secret_data.values.dev_token 
        // }
    },
}
module.exports={
    config
}