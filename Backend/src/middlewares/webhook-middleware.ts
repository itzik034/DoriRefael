import { NextFunction, Request, Response } from "express";
import { webhookService } from "../services/webhook-service";

class WebhookMiddleware {

    public verifySignature(request: Request, response: Response, next: NextFunction): void {
        try {
            const rawBody = request.body;
            if (!Buffer.isBuffer(rawBody)) {
                response.status(400).send("Bad Request: Body must be raw buffer");
                return;
            }

            const signatureHeader = request.header("X-SEO-Agent-Signature");
            const isValid = webhookService.verifySignature(rawBody, signatureHeader);
            if (!isValid) {
                response.status(401).send("Unauthorized: Signature mismatch or missing");
                return;
            }

            next();
        } catch (err: any) {
            next(err);
        }
    }
}

export const webhookMiddleware = new WebhookMiddleware();
