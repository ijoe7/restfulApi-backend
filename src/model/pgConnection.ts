import { createConnection } from "typeorm";
import { Comment } from "../entities/Comment";
import { Movie } from "../entities/Movie";
import dotenv from "dotenv";

dotenv.config()

export const main = async () => {
    try {
        await createConnection({
        type: process.env.TYPEORM_TYPE as "postgres",
        host: process.env.TYPEORM_HOST,
        port: 5431,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [Comment, Movie],
        synchronize: true
        })
        console.log("Connected to Postgres");
    } catch (error) {
        console.error(error);
        throw new Error("Unable to connect to db");
    }
    
}



