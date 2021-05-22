module.exports = {
  development: {
    username: "postgres",
    password: "admin",
    database: "dev-smbp",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    host: "ec2-54-163-254-204.compute-1.amazonaws.com",
    database: "d2m84ivtstpkum",
    username: "llrhegxqoadzls",
    password: "2e390caeec80834f489fb9a129cef378b4ee69fd81dbd30b96c78f453a011aff",
    port: "5432",
  },
  production: {
    username: "root",
    password: null,
    database: "smbp",
    host: "127.0.0.1",
    dialect: "postgres",
    use_env_variable: "DATABASE_URL"
  },
};
