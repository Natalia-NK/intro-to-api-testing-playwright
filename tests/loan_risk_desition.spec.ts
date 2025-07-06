import {APIResponse, expect, test} from '@playwright/test'
import {ApplicationDto} from "./dto/applicationDto";
import {StatusCodes} from "http-status-codes";

test ('post credit info with negative decision should receive code 200', async ({ request }) => {
    //prepare request body with dto pattern and very high risk
    const requestBody = new ApplicationDto(100, 0, 17, true, 1000, 12);
    const response:APIResponse = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision',{
        data: requestBody
    });

    console.log('response status:', response.status())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.OK )
});

test ('post credit info with positive decision should receive code 200', async ({ request })  => {
// prepare request body with dto pattern and medium risk
    const requestBody = new ApplicationDto(20000, 0, 30, true, 500, 6);
    const response:APIResponse = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision',{
        data: requestBody
    });
    console.log('response status:', response.status())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.OK )
});

test ('post credit info with positive decision should receive code 200', async ({ request }) => {
    // prepare request body with dto pattern and low risk
    const requestBody = new ApplicationDto(20000, 0, 30, true, 500, 12);
    const response:APIResponse = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision',{
        data: requestBody
    });
    console.log('response status:', response.status())
    console.log('response body:', await response.json())
    expect(response.status()).toBe(StatusCodes.OK )
});