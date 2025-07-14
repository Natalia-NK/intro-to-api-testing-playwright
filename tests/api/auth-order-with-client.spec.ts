import { test } from '@playwright/test'
import { ApiClient } from './api-client'

test('login and create order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
})

test('login and delete order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  const result: boolean = await apiClient.deleteOrderAndReturnStatus(orderId)
  console.log('Order deleted:', result)
})

test('login and search order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  const order = await apiClient.searchOrderAndReturnOrder(orderId)
  console.log('order:', order)
})
