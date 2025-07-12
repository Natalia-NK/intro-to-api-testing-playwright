import { APIResponse, expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/orderDto'
import { LoginDto } from './dto/login-dto'

const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
const url = 'https://backend.tallinn-learning.ee'
const loginStudentUrl = url + '/login/student'
const orderUrl = url + '/orders'

test('api login with correct credentials using loginDto and verify JWT', async ({ request }) => {
  const requestBody: LoginDto = LoginDto.createLoginWithCorrectData()
  const response: APIResponse = await request.post(loginStudentUrl, {
    data: requestBody,
  })

  const jwtValue = await response.text()

  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(jwtValue).toMatch(jwtRegex)
})

test('login and create order with correct credentials and order data', async ({ request }) => {
  const requestBody: LoginDto = LoginDto.createLoginWithCorrectData()
  const response: APIResponse = await request.post(loginStudentUrl, {
    data: requestBody,
  })

  const jwt = await response.text()
  const orderBody = new OrderDto('OPEN', 0, 'string', 'string', 'string')
  const authHeaders = {
    Authorization: `Bearer ${jwt}`,
  }
  console.log('orderBody', orderBody)
  console.log('authHeaders', authHeaders)
  console.log('request url', orderUrl)
  const orderResponse: APIResponse = await request.post(orderUrl, {
    headers: authHeaders,
    data: orderBody,
  })

  console.log('orderResponse status:', orderResponse.status())
  console.log('orderResponse body', orderResponse)
  const orderResponseBody = await orderResponse.json()
  console.log('orderResponse:', orderResponseBody)

  expect(orderResponse.status()).toBe(StatusCodes.OK)
  expect(orderResponseBody.id).toBeGreaterThan(0)
})

test('make request with incorrect HTTP method', async ({ request }) => {
  const requestBody: LoginDto = LoginDto.createLoginWithCorrectData()
  const response: APIResponse = await request.post(loginStudentUrl, {
    data: requestBody,
  })

  const jwt = await response.text()
  const orderBody = new OrderDto('OPEN', 0, 'new', '456677', 'new')
  const orderResponse: APIResponse = await request.patch(orderUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: orderBody,
  })

  expect(orderResponse.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('make request with incorrect order body (Status in wrong format)', async ({ request }) => {
  const requestBody: LoginDto = LoginDto.createLoginWithCorrectData()
  const response: APIResponse = await request.post(loginStudentUrl, {
    data: requestBody,
  })

  const jwt = await response.text()
  const orderBody = new OrderDto('Open', 0, 'new', '456677', 'new')
  const orderResponse: APIResponse = await request.post(orderUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: orderBody,
  })

  expect(orderResponse.status()).toBe(StatusCodes.BAD_REQUEST)
})
