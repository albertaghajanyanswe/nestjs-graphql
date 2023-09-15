import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

test('init', async () => {
  render(<App />, {wrapper: BrowserRouter})
  expect(1 + 2).toBe(3);
})
