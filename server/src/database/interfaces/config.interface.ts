export interface IDatabaseConfigAttributes {
  username: NonNullable<string>;
  password: NonNullable<string>;
  database: NonNullable<string>;
  host: NonNullable<string>;
  port: NonNullable<number> | NonNullable<string>;
  dialect: NonNullable<string>;
  urlDatabase: NonNullable<string>;
  synchronization: NonNullable<boolean>;
  define: NonNullable<Object>;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}
