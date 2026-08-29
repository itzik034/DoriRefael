import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { appConfig } from "../utils/app-config";
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

            const secret = appConfig.seoAgentSecret;
            if (!secret) {
                console.error("SEO_AGENT_SECRET is not defined in environment variables");
                response.status(StatusCode.Unauthorized).json({ message: "Unauthorized: Server configuration error" });
                return;
            }

            const receivedHex = signatureHeader.substring("sha256=".length).trim();
            if (!receivedHex) {
                response.status(StatusCode.Unauthorized).json({ message: "Unauthorized: Invalid signature format" });
                return;
            }

            // Access raw request body buffer
            const rawBody: Buffer = Buffer.isBuffer(request.body)
                ? request.body
                : typeof request.body === "string"
                ? Buffer.from(request.body, "utf8")
                : Buffer.alloc(0);

            // Calculate HMAC-SHA256 from raw body
            const hmac = crypto.createHmac("sha256", secret);
            hmac.update(rawBody);
            const calculatedHex = hmac.digest("hex");

            // Convert signatures to buffers for timing-safe equality comparison
            const receivedBuffer = Buffer.from(receivedHex, "utf8");
            const calculatedBuffer = Buffer.from(calculatedHex, "utf8");

            if (receivedBuffer.length !== calculatedBuffer.length || !crypto.timingSafeEqual(receivedBuffer, calculatedBuffer)) {
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

