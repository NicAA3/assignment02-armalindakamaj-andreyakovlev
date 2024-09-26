import { APIRequest, APIRequestContext } from "@playwright/test";


export class APIHelper {
    private BASE_URL: string;
    private USERNAME: string;
    private PASSWORD: string;
    private user_username: string | null = null;
    private token: string


    constructor(baseUrl: string, username: string, password: string) {
        this.BASE_URL = baseUrl;
        this.USERNAME = username;
        this.PASSWORD = password;
    }
    async performLogin(request: APIRequestContext) {
        const response = await request.post(`${this.BASE_URL}/api/login`, {
            data: {
                username: this.USERNAME,
                password: this.PASSWORD,
            }
        })
        const responseData = await response.json();
        this.token = responseData.token;
        this.user_username = responseData.username; // Store token after successful login

        return response

    }
    async getAllRooms(request: APIRequestContext) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token  // Example: Include token in the JSON          
        })

        const response = await request.get(`${this.BASE_URL}/api/rooms`, {
            headers: {
                'x-user-auth': authPayload,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    async postNewRoom(request: APIRequestContext, payload: object) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,  // Assuming you want to include the username
            token: this.token
        });
        const response = await request.post(`${this.BASE_URL}/api/room/new`, {
            headers: {
                'x-user-auth': authPayload,  // Send authPayload as JSON string
                'Content-Type': 'application/json',  // Specify content type
            },
            data: payload
        });
        return response;
    }
}