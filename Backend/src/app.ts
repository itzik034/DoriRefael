import cors from "cors";
import express from "express";
import { appConfig } from "./utils/app-config";
import { webhookController } from "./controllers/webhook-controller";
import { errorsMiddleware } from "./middlewares/errors-middleware";

class App {

    public start(): void {
        try {
            const server = express();
            server.use(cors());

            // Webhook router (handles raw body parsing)
            server.use(webhookController.router);

            // Parse JSON for other routes
            server.use(express.json());

            // Error middlewares
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
