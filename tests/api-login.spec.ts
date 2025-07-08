import { APIResponse, expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/orderDto'
import { LoginDto } from './dto/login-dto'

const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
const url = 'https://backend.tallinn-learning.ee'
const loginStudent = url + '/login/student'
const order = url + '/order'

test('api login with correct credentials using loginDto and verify JWT', async ({ request }) => {
  const requestBody: LoginDto = LoginDto.createLoginWithCorrectData()
  const response: APIResponse = await request.post(loginStudent, {
    data: requestBody,
  })

  const jwtValue: Promise<string> = response.text()

  console.log('JWT token:', jwtValue)

  expect(response.status()).toBe(StatusCodes.OK)
  expect(jwtValue).toMatch(jwtRegex)
})

test('login and create order with correct credentials and order data', async ({ request }) => {
  const requestBody: LoginDto = LoginDto.createLoginWithCorrectData()
  const response: APIResponse = await request.post(loginStudent, {
    data: requestBody,
  })

  const jwt = response.text()
  const orderBody = new OrderDto('Open', 0, 'new', '456677', 'new')
  const orderResponse: APIResponse = await request.post(order, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: orderBody,
  })

  const orderResponseBody = await orderResponse.json()

  console.log('orderResponse status:', orderResponse.status())
  console.log('orderResponse:', orderResponseBody)
  expect(orderResponse.status()).toBe(StatusCodes.OK)
  expect(orderResponseBody.id).toBeGreaterThan(0)
})

test('make request with incorrect HTTP method', async ({ request }) => {
  const requestBody: LoginDto = LoginDto.createLoginWithCorrectData()
  const response: APIResponse = await request.post(loginStudent, {
    data: requestBody,
  })

  const jwt = response.text()
  const orderBody = new OrderDto('Open', 0, 'new', '456677', 'new')
  const orderResponse: APIResponse = await request.patch(order, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: orderBody,
  })

  expect(orderResponse.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('make request with incorrect order body', async ({ request }) => {
  const requestBody: LoginDto = LoginDto.createLoginWithCorrectData()
  const response: APIResponse = await request.post(loginStudent, {
    data: requestBody,
  })

  const jwt: Promise<string> = response.text()
  const orderBody = { name: 'test' }
  const orderResponse: APIResponse = await request.post(order, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: orderBody,
  })

  expect(orderResponse.status()).toBe(StatusCodes.BAD_REQUEST)
})
