import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private BASE_URL: string;
    private USERNAME: string;
    private PASSWORD: string;


    constructor(baseUrl: string, username: string, password: string) {
        this.BASE_URL = baseUrl;
        this.USERNAME = username;
        this.PASSWORD = password;
    }
    async performLogin(request: APIRequestContext) {
        const respone = await request.post(`${this.BASE_URL}/api/login`, {
            data: {
                username: this.USERNAME,
                password: this.PASSWORD,
            }
        })

        return respone

    }
}