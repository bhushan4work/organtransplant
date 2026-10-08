import { test } from 'node:test';
import assert from 'node:assert';

test('API Client Configuration', () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  assert.ok(apiUrl, 'API URL should be configured');
  assert.match(apiUrl, /^https?:\/\//, 'API URL should be a valid URL starting with http:// or https://');
});
