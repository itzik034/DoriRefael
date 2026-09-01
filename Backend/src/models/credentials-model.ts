import { ValidationError } from "./client-errors";

export class CredentialsModel {
    public username: string;
    public password: string;

    public constructor(payload: any) {
        this.username = payload?.username;
        this.password = payload?.password;
    }

    public validate(): void {
        if (!this.username) {
            throw new ValidationError("Missing username.");
        }
        if (!this.password) {
            throw new ValidationError("Missing password.");
        }
    }
}
