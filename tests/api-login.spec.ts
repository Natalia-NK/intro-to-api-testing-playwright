import {APIResponse, expect, test} from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import {OrderDto} from "./dto/orderDto";
import {LoginDto} from "./dto/login-dto";

// JWT regex
const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

test("api login with correct credentials using loginDto and verify JWT", async ({request}) => {
    // prepare login request body
    const requestBody = LoginDto.createLoginWithCorrectData()
    // make login request
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
        data: requestBody
    })

    // retrieve jwt token
    const jwtValue = response.text();

    console.log('JWT token:', jwtValue)

    expect(response.status()).toBe(StatusCodes.OK)
    expect(jwtValue).toMatch(jwtRegex)
})

test("login and create order with correct credentials and order data", async ({request}) => {
    // login student with correct data using LoginDto
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
        data: requestBody
    })

    // retrieve jwt token
    const jwt = response.text();
    // prepare new order request body
    const orderBody = new OrderDto('Open', 0, 'new', '456677', 'new');
    // make request to create new order with jwt token
    const orderResponse = await request.post('https://backend.tallinn-learning.ee/order', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        data: orderBody
    })

    // parse order response
    const orderResponseBody = await orderResponse.json();

    console.log('orderResponse status:', orderResponse.status())
    console.log('orderResponse:', orderResponseBody)
    expect(orderResponse.status()).toBe(StatusCodes.OK)
    expect(orderResponseBody.id).toBeGreaterThan(0)

})

test("make request with incorrect HTTP method", async ({request}) => {
    // login student with correct data using LoginDto
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
        data: requestBody
    })

    // retrieve jwt token
    const jwt = response.text();
    // prepare new order request body
    const orderBody = new OrderDto('Open', 0, 'new', '456677', 'new');
    // make request to create new order with jwt token and invalid HTTP method 'patch'
    const orderResponse = await request.patch('https://backend.tallinn-learning.ee/order', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        data: orderBody
    })

    expect(orderResponse.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test("make request with incorrect order body", async ({request}) => {
    // login student with correct data using LoginDto
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
        data: requestBody
    })

    // retrieve jwt token
    const jwt = response.text();
    // prepare new order request body
    const orderBody = {"name": "test"};
    // make request to create new order with jwt token and invalid order body
    const orderResponse = await request.post('https://backend.tallinn-learning.ee/order', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        data: orderBody
    })

    expect(orderResponse.status()).toBe(StatusCodes.BAD_REQUEST)
})