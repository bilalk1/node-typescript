var config = {
    development: {
        credentials: {
            adminUser: 'admin',
            password: 'admin123',
            email: `admin@admin.com`
        },
        sparkPost: {
            url: `https://api.sparkpost.com/api/v1/transmissions`,
            authorization: `3e5d1a2d91cbc4e652f607483d85c178ec2cac29`,
            email: `poc@gnd-canvas.ca`,
            contentTtype: `application/json`,
            name: `G+D Canvas`,
            subject: `POC from G+D`
        },
        ip: '127.0.0.1',
        node_port: 3000,
        db: {
            host: 'mongodb://localhost:27017/e_activate_manager',
        },
        jwtSecret: 'password',

    },
}
module.exports = {
    config
}