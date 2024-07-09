import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from './mocks/server';
import "@testing-library/jest-dom";

//expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Start worker before all tests
beforeAll(() => { server.listen() })

// Reset handlers after each test `important for test isolation`
afterEach(() => {server.resetHandlers()})

//  Close worker after all tests
afterAll(() => {server.close()})
