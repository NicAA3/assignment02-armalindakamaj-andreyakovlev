import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { BASE_URL, USERNAME, PASSWORD } from './testTarget';



test.describe('test suite 01', () => {
  let apiHelper: APIHelper;


  test.beforeAll(async ({ request }) => {
    apiHelper = new APIHelper(BASE_URL, USERNAME, PASSWORD);
    const loginResponse = await apiHelper.performLogin(request);
    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    expect(loginData).toHaveProperty('username', USERNAME);
    expect(loginData).toHaveProperty('token');
    //console.log(`Token received: ${loginData.token}`);

  })



  test('Test case 01, loga in', async ({ request }) => {

    const loginResponse = await apiHelper.performLogin(request);
    const loginData = await loginResponse.json();
    expect(loginResponse.ok()).toBeTruthy();
    // Verify that the token and username exist in the response
    expect(loginData).toMatchObject({
      username: USERNAME,
      token: expect.any(String),
    });

  });

  test('Test case 02, get all rooms', async ({ request }) => {
    const roomsResponse = await apiHelper.getAllRooms(request);
    expect(roomsResponse.ok()).toBeTruthy();
  });


})


