module.exports = {
  name: 'default',
  type: process.env.DB_CONNECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsTableName: 'custom_migration_table',
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/app/models/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations'
  }
}
