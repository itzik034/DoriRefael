import { NextFunction, Request, Response } from "express";
import { webhookService } from "../services/webhook-service";
import { StatusCode } from "../models/enums";

class WebhookMiddleware {

    public verifySignature(request: Request, response: Response, next: NextFunction): void {
        try {
            const signatureHeader = request.header("X-SEO-Agent-Signature");

            // Ensure header exists and starts with sha256=
            if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
                response.status(StatusCode.Unauthorized).json({ message: "Unauthorized: Missing or invalid X-SEO-Agent-Signature header" });
                return;
            }

            // Access raw request body buffer
            const rawBody: Buffer = Buffer.isBuffer(request.body)
                ? request.body
                : typeof request.body === "string"
                ? Buffer.from(request.body, "utf8")
                : Buffer.alloc(0);

            const isValid = webhookService.verifySignature(rawBody, signatureHeader);
            if (!isValid) {
                response.status(StatusCode.Unauthorized).json({ message: "Unauthorized: Signature mismatch" });
                return;
            }

            next();
        } catch (err: any) {
            next(err);
        }
    }
}

export const webhookMiddleware = new WebhookMiddleware();
