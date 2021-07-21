import { createConnection } from "typeorm";
import { Comment } from "../entities/Comment";
import { Movie } from "../entities/Movie";
import dotenv from "dotenv";

dotenv.config()

export const main = async () => {
    try {
        await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [Comment, Movie],
            synchronize: true,
            ssl: {
            rejectUnauthorized: false
        }
        })
        console.log("Connected to Postgres");
    } catch (error) {
        console.error(error);
        throw new Error("Unable to connect to db");
    }
    
}



