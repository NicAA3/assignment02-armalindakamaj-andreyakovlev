import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { BASE_URL } from './testTarget';

test.describe('test suite o1', () => {
  let apiHelper: APIHelper;

  test.beforeAll(() => {
    apiHelper = new APIHelper(BASE_URL);
  })

  test('Test case 01, loga in', async ({ request }) => {
    const getLoggainResponse = await apiHelper.performLogin(request);
    expect(getLoggainResponse.ok()).toBeTruthy();


  });

})


