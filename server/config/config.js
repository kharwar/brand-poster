module.exports = {
  development: {
    username: "postgres",
    password: "admin",
    database: "dev-smbp",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "dev-smbp",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "smbp",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
