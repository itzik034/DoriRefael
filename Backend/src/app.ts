import cors from "cors";
import express from "express";
import { appConfig } from "./utils/app-config";
import { controller } from "./controller";
import { errorsMiddleware } from "./middlewares/errors-middleware";

class App {

    public start(): void {
        try {
            const server = express();
            server.use(cors());
            server.use(express.json());
            server.use(controller.router);
            server.use(errorsMiddleware.routeNotFound);
            server.use(errorsMiddleware.catchAll);
            server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
        }
        catch (err: any) {
            console.error(err);
        }
    }
}

const app = new App();
app.start();
