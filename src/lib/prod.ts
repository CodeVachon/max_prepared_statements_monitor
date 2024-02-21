import knex from "knex";

export const prod = knex({
    client: "mysql2",
    connection: {
        host: String(process.env.MYSQL_URL ?? "localhost"),
        port: Number(process.env.MYSQL_PORT ?? 3306),
        user: String(process.env.MYSQL_USER ?? "root"),
        password: String(process.env.MYSQL_PASSWORD ?? "I Don't Know..."),
        database: String(process.env.MYSQL_DATABASE ?? "default")
    },
    pool: { min: 0, max: 7 }
});
