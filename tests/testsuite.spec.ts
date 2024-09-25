import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { BASE_URL } from './testTarget';
import { USERNAME } from './testTarget';
import { PASSWORD } from './testTarget';


test.describe('test suite 01', () => {
  let apiHelper: APIHelper;


  test.beforeAll(() => {
    apiHelper = new APIHelper(BASE_URL, USERNAME, PASSWORD);
  })

  test('Test case 01, loga in', async ({ request }) => {
    const getLoggainResponse = await apiHelper.performLogin(request);
    expect(getLoggainResponse.ok()).toBeTruthy();


    const token = JSON.parse(await getLoggainResponse.text()).token;
    console.log(token);
    //Verify that token and username exists in response
    expect(await getLoggainResponse.json()).toHaveProperty('token');
    expect(await getLoggainResponse.json()).toMatchObject({
      username: USERNAME
    })

  });

})


