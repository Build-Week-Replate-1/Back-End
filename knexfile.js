module.exports = {
    development: {
        client: 'sqlite3',
        connection: {filename: './database/replate.db3'},
        migrations: {
            directory: './database/migrations',
            tableName: 'dbmigrations'
        },
        seeds: {
            directory: './database/seeds'
        },
        pool:{
            afterCreate:(conn, done) => {
                conn.run('PRAGMA foreign_keys = ON', done)
            }
        }
    },
    production: {
        client: 'sqlite3',
        connection: {filename: './database/replate.db3'},
        migrations: {
            directory: './database/migrations',
            tableName: 'dbmigrations'
        },
        seeds: {
            directory: './database/seeds'
        },
        pool:{
            afterCreate:(conn, done) => {
                conn.run('PRAGMA foreign_keys = ON', done)
            }
        }
    }
}