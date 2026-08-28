import express, { Request, Response, Router } from "express";
import { webhookService } from "../services/webhook-service";
import { webhookMiddleware } from "../middlewares/webhook-middleware";

class WebhookController {
    public router: Router = express.Router();

    public constructor() {
        // We use express.raw to ensure the body is parsed as a Buffer, and webhookMiddleware to verify the signature.
        this.router.post(
            "/api/seo-agent-webhook",
            express.raw({ type: 'application/json' }),
            webhookMiddleware.verifySignature,
            this.handleWebhook
        );
    }

    private handleWebhook = async (request: Request, response: Response) => {
        try {
            const payload = JSON.parse(request.body.toString("utf8"));
            const resultMessage = await webhookService.processEvent(payload);
            response.status(200).send(resultMessage);
        } catch (err: any) {
            console.error("Webhook processing error:", err);
            response.status(500).send("Internal Server Error");
        }
    };
}

export const webhookController = new WebhookController();
