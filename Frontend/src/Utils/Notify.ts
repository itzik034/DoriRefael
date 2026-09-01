import { Notyf } from "notyf"; // npm i notyf

class Notify {

    private notyf: Notyf | null = null;

    private getNotyf(): Notyf | null {
        // Guard against execution in SSR / Node.js environment during build
        if (typeof window === "undefined" || typeof document === "undefined") {
            return null;
        }
        if (!this.notyf) {
            this.notyf = new Notyf({
                position: { x: "right", y: "bottom" },
                duration: 3000,
                dismissible: true,
                ripple: true 
            });
        }
        return this.notyf;
    }

    public success(message: string): void {
        this.getNotyf()?.success(message);
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.getNotyf()?.error(message);
    }

    private extractErrorMessage(err: any): string {
        if(typeof err === "string") return err; // String error.
        if(typeof err?.response?.data === "string") return err.response.data; // Axios error
        if(typeof err?.response?.data?.message === "string") return err.response.data.message;
        if(typeof err?.message === "string") return err.message; // throw new Error("...")
        return "Some error, please try again.";
    }

}

export const notify = new Notify();
