import {APIResponse, expect, test} from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import {OrderDto} from "./dto/orderDto";
import {LoginDto} from "./dto/login-dto";

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(200)
})
test('get order with incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 400
  expect(response.status()).toBe(400)
})
test('put order with correct data should receive code 200', async ({ request }) => {
  // prepare request body
  const requestBody = {
    courierId: 1,
    customerName: 'new name',
    customerPhone: '1234567',
    comment: 'test comment',
  }
  // request api key
  const login_response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    data: LoginDto.createLoginWithCorrectData()
  })

  const loginBody = await login_response.json()
  const apiKey = loginBody.apiKey

  // send delete request
  const requestHeaders = {
    api_key: apiKey,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

//Send a DELETE request to the server
test('delete order with correct data', async ({ request }) => {
  // request api key
  const login_response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    data: LoginDto.createLoginWithCorrectData()
  })

  const loginBody = await login_response.json()
  const apiKey = loginBody.apiKey

  // send delete request
  const requestHeaders = {
    api_key: apiKey,
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('post order with correct data', async ({ request }) => {
  //send a POST request to the server
  const requestBody = new OrderDto('Open', 0, 'new', '456677', 'new');

  const response: APIResponse = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })

  //log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test ('post order with correct id should receive code 200', async ({ request }) => {
  //prepare request body with dto pattern
  const requestBody = new OrderDto('Open', 0, 'new', '456677', 'new', );
  const response:APIResponse = await request.post('https://backend.tallinn-learning.ee/test-orders',{
    data: requestBody
  });

  console.log('response status:', response.status())
})


test('test mess', async ({request}) => {
  const requestBody = {};
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    headers: {},
    data: requestBody
  })

  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.OK)
})


