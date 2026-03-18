const { test, expect } = require('@playwright/test');
const { apiBase }      = require('../../utils/testdata');

test.describe('JSONPlaceholder API Tests', () => {

  test('GET - Fetch users list returns 200', async ({ request }) => {
    const response = await request.get(`${apiBase}/users`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('email');
  });

  test('GET - Fetch single user returns 200', async ({ request }) => {
    const response = await request.get(`${apiBase}/users/1`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.name).toBeDefined();
  });

  test('POST - Create a post returns 201', async ({ request }) => {
    const response = await request.post(`${apiBase}/posts`, {
      data: {
        title: 'Playwright API Test',
        body: 'Testing with Playwright',
        userId: 1
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe('Playwright API Test');
    expect(body.id).toBeDefined();
  });

  test('PUT - Update a post returns 200', async ({ request }) => {
    const response = await request.put(`${apiBase}/posts/1`, {
      data: {
        title: 'Updated Title',
        body: 'Updated body',
        userId: 1
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated Title');
  });

  test('DELETE - Delete a post returns 200', async ({ request }) => {
    const response = await request.delete(`${apiBase}/posts/1`);
    expect(response.status()).toBe(200);
  });

  test('GET - Invalid user returns 404', async ({ request }) => {
    const response = await request.get(`${apiBase}/users/9999`);
    expect(response.status()).toBe(404);
  });

});