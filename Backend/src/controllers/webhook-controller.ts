import express, { NextFunction, Request, Response, Router } from "express";
import { webhookService } from "../services/webhook-service";
import { webhookMiddleware } from "../middlewares/webhook-middleware";
import { StatusCode } from "../models/enums";

class WebhookController {
    public router: Router = express.Router();

    public constructor() {
        // Use express.raw to preserve the raw byte buffer before signature verification
        this.router.post(
            "/api/seo-agent-webhook",
            express.raw({ type: "*/*", limit: "50mb" }),
            webhookMiddleware.verifySignature,
            this.handleWebhook
        );
    }

    private handleWebhook = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const rawBodyString = Buffer.isBuffer(request.body)
                ? request.body.toString("utf8")
                : typeof request.body === "string"
                ? request.body
                : JSON.stringify(request.body);

            const payload = rawBodyString ? JSON.parse(rawBodyString) : {};
            const result = await webhookService.processEvent(payload);

            if (typeof result === "object") {
                response.status(StatusCode.OK).json(result);
            } else {
                response.status(StatusCode.OK).send(result);
            }
        } catch (err: any) {
            next(err);
        }
    };
}

export const webhookController = new WebhookController();
