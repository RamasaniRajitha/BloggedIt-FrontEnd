/** @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import BlogSearch from '../components/BlogSearch/BlogSearch';

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

// Mock location
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        search: '?searchQuery=none&tags=none',
    }),
}));

// Mock search action
jest.mock('../actions/blogs', () => ({
    ...jest.requireActual('../actions/blogs'),
    getBlogBySearch: jest.fn(),
}));

// Test if the BlogSearch component renders correctly
test('BlogSearch renders correctly', () => {
    const { container: view, getByRole } = render(<BlogSearch/>);
    expect(view).toMatchSnapshot();
});