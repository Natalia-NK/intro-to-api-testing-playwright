## Test Scenarios Table

# Homework 9

| HTTP Method | Scenario Description              | Expected Status | Status |
| ----------- |-----------------------------------| --------------- | ------ |
| GET         | Get order with valid ID           | 200             | PASS   |
| GET         | Get order with invalid ID         | 400             | PASS   |
| PUT         | Update order with valid data      | 200             | PASS   |
| DELETE      | Delete order with valid ID        | 204             | PASS   |


# Homework 10


| HTTP Method | Scenario Description       | Risk   | Expected Status | Status |
| ----------- |----------------------------|--------| --------------- | ------ |
| POST        | Post order with valid data | V.High | 200             | PASS   |
| POST        | Post order with valid data | Medium | 200             | PASS   |
| POST        | Post order with valid data | Low    | 200             | PASS   |

# Homework 11


| HTTP Method | Scenario Description                | Expected Status | Status |
|-------------|-------------------------------------|-----------------| ------ |
| POST        | Post order with valid data & tekst  | 200             | PASS   |
| PATCH       | Post order with invalid HTTP method | 405             | PASS   |
| POST        | Post order with invalid body data   | 400             | PASS   |
