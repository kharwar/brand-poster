module.exports = {
  development: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: "postgres",
  },
  test: {
    host: "",
    database: "",
    username: "",
    password: "",
    port: "",
    dialect: "postgres",
  },
  production: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: "postgres",
    use_env_variable: "DATABASE_URL"
  },
};
