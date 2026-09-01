import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { appConfig } from "../utils/app-config";

class BuildService {
    private isBuilding: boolean = false;
    private buildPending: boolean = false;

    public async deployDist(): Promise<boolean> {
        try {
            const distDir = path.join(appConfig.frontendDir, "dist");
            const targetDir = appConfig.publicHtmlDir;

            console.log(`Deploying build output from ${distDir} to ${targetDir}...`);
            await fs.mkdir(targetDir, { recursive: true });
            await fs.cp(distDir, targetDir, { recursive: true, force: true });
            console.log(`Successfully deployed frontend build to ${targetDir}`);
            return true;
        } catch (copyError: any) {
            console.error("Failed to copy build output to public_html:", copyError.message || copyError);
            return false;
        }
    }

    public triggerFrontendBuild(): void {
        if (this.isBuilding) {
            console.log("Frontend build is already in progress. Queuing next build.");
            this.buildPending = true;
            return;
        }

        this.isBuilding = true;
        console.log(`Starting frontend build in ${appConfig.frontendDir}...`);

        exec(
            "npm run build",
            {
                cwd: appConfig.frontendDir,
                env: {
                    ...process.env,
                    RAYON_NUM_THREADS: "1",
                    UV_THREADPOOL_SIZE: "2"
                }
            },
            async (error, stdout, stderr) => {
                try {
                    if (error) {
                        console.error("Frontend build failed:", error.message);
                    } else {
                        if (stderr) {
                            console.warn("Frontend build stderr:", stderr);
                        }
                        console.log("Frontend build completed successfully:", stdout);

                        // Deploy built frontend assets to public_html directory
                        await this.deployDist();
                    }
                } finally {
                    this.isBuilding = false;

                    // If another build was requested while this build was in progress, execute it now
                    if (this.buildPending) {
                        console.log("Executing pending queued build...");
                        this.buildPending = false;
                        this.triggerFrontendBuild();
                    }
                }
            }
        );
    }
}

export const buildService = new BuildService();
