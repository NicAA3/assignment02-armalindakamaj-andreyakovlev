import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private BASE_URL: string;
    // username: string
    // password: string


    constructor(baseUrl: string) {
        this.BASE_URL = baseUrl;
        //this.password = password;
        // this.username = username;
    }
    async performLogin(request: APIRequestContext) {
        const respone = await request.post(`${this.BASE_URL}/api/login`, {
            data: {
                username: 'tester01',
                password: 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c',
            }
        })

        return respone

    }
}