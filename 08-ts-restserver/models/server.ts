import express, { Application } from "express";

import cors from "cors";

import userRoutes from "../routes/users";
import db from "../db/connection";

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        users: "/api/users",
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";

        this.connectDb();
        this.middlewares();
        this.routes();
    }

    async connectDb() {
        try {
            await db.authenticate();

            console.log("Database online");
        } catch (error) {
            throw error;
        }
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Body
        this.app.use(express.json());

        // Public
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }
}

export default Server;
