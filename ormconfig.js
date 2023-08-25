module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "nest_aa",
  password: "Albert1993!",
  seeds: ["dist/database/seeds/*.js"],
  factories: ["dist/database/factories/*.js"],
  entities: ["dist/**/*.model.js"],
  migrations: ["dist/database/migrations/*.js"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: "../database/migrations",
  },
  synchronize: true,
};
