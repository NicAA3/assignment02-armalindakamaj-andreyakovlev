import { APIRequestContext } from "@playwright/test";


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
        const response = await request.post(`${this.BASE_URL}/login`, {
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

        const response = await request.get(`${this.BASE_URL}/rooms`, {
            headers: {
                'x-user-auth': authPayload,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    async postNewRoom(request: APIRequestContext, payload: object) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token
        });
        const response = await request.post(`${this.BASE_URL}/room/new`, {
            headers: {
                'x-user-auth': authPayload,  // Send authPayload as JSON string
                'Content-Type': 'application/json',  // Specify content type
            },
            data: payload
        });
        return response;
    }

    async editRoom(request: APIRequestContext, payload: object) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token
        });

        const response = await request.put(`${this.BASE_URL}/room/2`, {
            headers: {
                'x-user-auth': authPayload,  // Auth as JSON string
                'Content-Type': 'application/json',  // Ensure the payload is JSON
            },
            data: payload,
        })
        return response
    }
    async deleteRoom(request: APIRequestContext, roomId: number) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token
        });

        const response = await request.delete(`${this.BASE_URL}/room/${roomId}`, {
            headers: {
                'x-user-auth': authPayload,  // Auth as JSON string
                'Content-Type': 'application/json',  // Ensure the payload is JSON
            }

        })
        return response
    }
    async getAllClient(request: APIRequestContext) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token
        });

        const response = await request.get(`${this.BASE_URL}/clients`, {
            headers: {
                'x-user-auth': authPayload,  // Auth as JSON string
                'Content-Type': 'application/json',  // Ensure the payload is JSON
            }

        })
        return response
    }

    async postNewClient(request: APIRequestContext, payload: object) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token
        });
        const response = await request.post(`${this.BASE_URL}/client/new`, {
            headers: {
                'x-user-auth': authPayload,  // Send authPayload as JSON string
                'Content-Type': 'application/json',  // Specify content type
            },
            data: payload
        });
        return response;
    }

    async postNewBill(request: APIRequestContext, payload: object) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token
        });
        const response = await request.post(`${this.BASE_URL}/bill/new`, {
            headers: {
                'x-user-auth': authPayload,  // Send authPayload as JSON string
                'Content-Type': 'application/json',  // Specify content type
            },
            data: payload
        });
        return response;
    }

    async getAllBills(request: APIRequestContext) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token         
        })

        const response = await request.get(`${this.BASE_URL}/bills`, {
            headers: {
                'x-user-auth': authPayload,
                'Content-Type': 'application/json'
            }
        })
        return response
    }

    async deleteBill(request: APIRequestContext, billId: number) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token
        });

        const response = await request.delete(`${this.BASE_URL}/bill/${billId}`, {
            headers: {
                'x-user-auth': authPayload,
                'Content-Type': 'application/json', 
            }

        })
        return response
    }
    async getAllReservations(request: APIRequestContext) {
        const authPayload = JSON.stringify({
            username: this.USERNAME,
            token: this.token  // Example: Include token in the JSON          
        })

        const response = await request.get(`${this.BASE_URL}/reservations`, {
            headers: {
                'x-user-auth': authPayload,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
}