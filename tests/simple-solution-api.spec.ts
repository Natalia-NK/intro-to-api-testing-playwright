import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

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
        comment: 'test comment'
    }
    // Send a PUT request to the server
    const requestHeaders = {
        'api_key': 'lI2oxMsRQa0wJLd8',
    };
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

    // send a delete
    const requestHeaders = {
        'api_key': 'lI2oxMsRQa0wJLd8',
    };
    const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
        headers: requestHeaders
    })
    console.log('response status:', response.status())
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
});
