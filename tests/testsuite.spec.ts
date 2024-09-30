import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { BASE_URL } from './testTarget'
import { generateRandomRoomsPayload, generateEditRoomsPayload, generateRandomClientsPayload, generateRandomBillsPayload } from './testData'




test.describe('test suite 01', () => {
  let apiHelper: APIHelper;


  test.beforeAll(async ({ request }) => {
    apiHelper = new APIHelper(BASE_URL, `${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    console.log(`${process.env.TEST_PASSWORD}`)
    const loginResponse = await apiHelper.performLogin(request);
    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    expect(loginData).toHaveProperty('username', `${process.env.TEST_USERNAME}`);
    expect(loginData).toHaveProperty('token');

  })


  test('Test case 01, loga in', async ({ request }) => {

    const loginResponse = await apiHelper.performLogin(request);
    const loginData = await loginResponse.json();
    expect(loginResponse.ok()).toBeTruthy();
    // Verify that the token and username exist in the response
    expect(loginData).toMatchObject({
      username: `${process.env.TEST_USERNAME}`,
      token: expect.any(String),
    });

  });

  test('Test case 02, get all rooms', async ({ request }) => {
    const roomsResponse = await apiHelper.getAllRooms(request);
    expect(roomsResponse.ok()).toBeTruthy();
    const roomsData = await roomsResponse.json();
    expect(roomsData.length).toBeGreaterThan(0);
    expect(roomsData[0]).toMatchObject({
      "id": 1,
      "created": "2020-01-03T12:00:00.000Z",
      "category": "double",
      "floor": 1,
      "number": 101,
      "available": true,
      "price": 1500,
      "features": [
        "balcony",
        "ensuite"
      ]
    });
  })

  test('Test case 03 - create room', async ({ request }) => {
    const payload = generateRandomRoomsPayload();
    const createPostResponse = await apiHelper.postNewRoom(request, payload);
    expect(createPostResponse.ok()).toBeTruthy();
    const responseData = await createPostResponse.json();
    expect(responseData).toHaveProperty('id');  // Ensure room ID exists
    expect(responseData).toMatchObject({
      category: payload.category,
      number: payload.number,
      floor: payload.floor,
      available: payload.available,
      price: payload.price,
      features: payload.features,
    });

  });

  test('Test case 04 - Edit room 2', async ({ request }) => {
    const payload = generateEditRoomsPayload();
    const createPostResponse = await apiHelper.editRoom(request, payload);
    expect(createPostResponse.ok()).toBeTruthy();
    const responseData = await createPostResponse.json();
    expect(responseData).toMatchObject({
      category: 'Test category',
      number: payload.number,
      floor: payload.floor,
      available: payload.available,
      price: payload.price,
      features: 'test',
    });

  });

  test('Test case 05 - Delete room', async ({ request }) => {
    const payload = generateRandomRoomsPayload();
    const createPostResponse = await apiHelper.postNewRoom(request, payload);
    expect(createPostResponse.ok()).toBeTruthy();
    const getAllRooms = await apiHelper.getAllRooms(request);
    expect(getAllRooms.ok()).toBeTruthy();
    const getRoom = await getAllRooms.json();
    const lastButOneID = getRoom[getRoom.length - 2].id;
    const deleteRequest = await apiHelper.deleteRoom(request, lastButOneID);
    expect(deleteRequest.ok()).toBeTruthy();

  });
  test('Test case 06 - Create Client', async ({ request }) => {
    const payload = generateRandomClientsPayload();
    const createPostResponse = await apiHelper.postNewClient(request, payload);
    expect(createPostResponse.ok()).toBeTruthy();
    const responseData = await createPostResponse.json();
    expect(responseData).toHaveProperty('id');  // Ensure client ID exists
    expect(responseData).toMatchObject({
      name: payload.name,
      email: payload.email,
      telephone: payload.telephone
    });
  });

  test('Test case 07 - Create Bill', async ({ request }) => {
    const payload = generateRandomBillsPayload();
    const createPostResponse = await apiHelper.postNewBill(request, payload);
    expect(createPostResponse.ok()).toBeTruthy();
    const responseData = await createPostResponse.json();
    expect(responseData).toHaveProperty('id');  // Ensure client ID exists
    expect(responseData).toMatchObject({
      value: payload.value,
      paid: payload.paid
    });
  });

  test('Test case 08 - Delete Bill', async ({ request }) => {
    const payload = generateRandomBillsPayload();
    const createPostResponse = await apiHelper.postNewBill(request, payload);
    expect(createPostResponse.ok()).toBeTruthy();
    const getAllBills = await apiHelper.getAllBills(request);
    expect(getAllBills.ok()).toBeTruthy();
    const getBill = await getAllBills.json();
    const lastButOneID = getBill[getBill.length - 2].id;
    const deleteRequest = await apiHelper.deleteBill(request, lastButOneID);
    expect(deleteRequest.ok()).toBeTruthy();

  });

  test('Test case 09 - Get All Reservations', async ({ request }) => {
    const reservationsRespons = await apiHelper.getAllReservations(request);
    expect(reservationsRespons.ok()).toBeTruthy();
    const reservationsData = await reservationsRespons.json();
    expect(reservationsData.length).toBeGreaterThan(0);
    expect(reservationsData[0]).toMatchObject({
      "id": 1,
      "created": "2020-01-10T12:00:00.000Z",
      "start": "2020-04-01",
      "end": "2020-04-04",
      "client": 1,
      "room": 1,
      "bill": 1
  });

  });

  test('Test case 10 - Get All Clients', async ({ request }) => {
    const clientsRespons = await apiHelper.getAllClient(request);
    expect(clientsRespons.ok()).toBeTruthy();
    const clientsData = await clientsRespons.json();
    expect(clientsData.length).toBeGreaterThan(0);
    expect(clientsData[0]).toMatchObject({
      "id": 1,
      "created": "2020-01-05T12:00:00.000Z",
      "name": "Jonas Hellman",
      "email": "jonas.hellman@example.com",
      "telephone": "070 000 0001"
  });

  });
})



