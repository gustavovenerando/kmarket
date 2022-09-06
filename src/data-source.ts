import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(
	process.env.NODE_ENV === "test"
		? {
				type: "sqlite",
				database: ":memory:",
				synchronize: true,
				entities: ["src/entities/*.ts"],
		  }
		: {
				type: "postgres",

				url:
					process.env.NODE_ENV === "production" ||
					process.env.NODE_ENV === "dev"
						? process.env.DATABASE_URL
						: "postgres://kenzinho:1234@db:5432/kmarket", //configuracoes docker.yml
				ssl:
					process.env.NODE_ENV === "production"
						? { rejectUnauthorized: false }
						: false,

				logging: true,
				synchronize: false,
				entities:
					process.env.NODE_ENV === "production"
						? ["dist/src/entities/*.js"]
						: ["src/entities/*.ts"],
				migrations:
					process.env.NODE_ENV === "production"
						? ["dist/src/migrations/*.js"]
						: ["src/migrations/*.ts"],
		  }
);

export default AppDataSource;
