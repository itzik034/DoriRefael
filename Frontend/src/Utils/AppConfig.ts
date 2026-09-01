class AppConfig {
    public readonly baseUrl = "";
    public readonly loginUrl = `${this.baseUrl}/api/auth/login`;
    public readonly articlesUrl = `${this.baseUrl}/api/articles`;
    public readonly uploadImageUrl = `${this.baseUrl}/api/upload/image`;
}

export const appConfig = new AppConfig();
