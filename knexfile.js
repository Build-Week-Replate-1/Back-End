module.exports = {
    development: {
        client: 'sqlite3',
        connection: {filename: './database/replated.db3'},
        migrations: {
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeds'
        },
        pool:{
            afterCreate:(conn, done) => {
                conn.run('PRAGMA foreign_keys = ON', done)
            }
        },
        useNullAsDefault: true
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeds'
        }
    }
}