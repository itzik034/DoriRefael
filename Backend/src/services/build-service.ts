import { exec } from "child_process";
import { appConfig } from "../utils/app-config";

class BuildService {
    private isBuilding: boolean = false;
    private buildPending: boolean = false;

    public triggerFrontendBuild(): void {
        if (this.isBuilding) {
            console.log("Frontend build is already in progress. Queuing next build.");
            this.buildPending = true;
            return;
        }

        this.isBuilding = true;
        console.log("Starting frontend build...");

        exec("npm run build", { cwd: appConfig.frontendDir }, (error, stdout, stderr) => {
            this.isBuilding = false;

            if (error) {
                console.error("Frontend build failed:", error.message);
            } else {
                if (stderr) {
                    console.warn("Frontend build stderr:", stderr);
                }
                console.log("Frontend build completed successfully:", stdout);
            }

            // If another build was requested while this build was in progress, execute it now
            if (this.buildPending) {
                console.log("Executing pending queued build...");
                this.buildPending = false;
                this.triggerFrontendBuild();
            }
        });
    }
}

export const buildService = new BuildService();
