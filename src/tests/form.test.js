/** @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import Form from '../components/Form/Form'; // Update the import path accordingly

// Mock dependencies
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('Form Component', () => {
  // Mock the Redux store state and actions as needed
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useSelector: jest.fn(),
      useDispatch: () => mockDispatch,
    }));
  });

  
  test('renders form elements', () => {
    const { container: view, getByRole } = render(<Form currentId={0} setCurrentId={() => {}} setDisplayForm={() => {}} />);
    expect(view).toMatchSnapshot();
  });
});